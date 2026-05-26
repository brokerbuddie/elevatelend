/* ------------------------------------------------------------------ */
/*  MYFY-style lender matching algorithm for ElevateLend               */
/*  Pure function — no DB, no I/O                                      */
/* ------------------------------------------------------------------ */

import { DETAILED_LENDERS, type DetailedLender, type LenderProduct } from "@/content/lenders-detailed";

/* ------------------------------------------------------------------ */
/*  Input normalisation helpers                                        */
/* ------------------------------------------------------------------ */
const TRADING_MONTHS_MAP: Record<string, number> = {
  "< 6 months": 3,
  "less-than-6": 3,
  "0-6": 3,
  "6-12 months": 9,
  "6-12": 9,
  "1-2 years": 18,
  "1-2": 18,
  "2-5 years": 36,
  "2-5": 36,
  "5+ years": 72,
  "5-10": 84,
  "5-plus": 72,
  "10-plus": 144,
  "10+ years": 144,
};

export function tradingMonthsToNumber(val: string): number {
  if (!val) return 0;
  const mapped = TRADING_MONTHS_MAP[val];
  if (mapped !== undefined) return mapped;
  const num = parseInt(val, 10);
  return isNaN(num) ? 0 : num;
}

const MONTHLY_REVENUE_MAP: Record<string, number> = {
  "under-5k": 2500,
  "5k-10k": 7500,
  "10k-20k": 15000,
  "20k-50k": 35000,
  "50k-100k": 75000,
  "100k-250k": 175000,
  "250k-plus": 375000,
};

export function monthlyRevenueToNumber(val: string): number {
  if (!val) return 0;
  const mapped = MONTHLY_REVENUE_MAP[val];
  if (mapped !== undefined) return mapped;
  const num = parseFloat(val.replace(/[,$\s]/g, ""));
  return isNaN(num) ? 0 : num;
}

/* ------------------------------------------------------------------ */
/*  Existing lender types (for the form)                               */
/* ------------------------------------------------------------------ */
export type ExistingFacility = {
  name: string;
  balance?: string;
  category?: string;
};

/* ------------------------------------------------------------------ */
/*  Match input / output types                                         */
/* ------------------------------------------------------------------ */
export interface MatchInput {
  productType: string;
  loanAmount: number;
  loanTerm: number;
  monthlyRevenue: string;
  yearsInBusiness: string;
  creditScore: string;
  hasPropertySecurity: boolean;
  existingFacilities?: ExistingFacility[];
}

export interface MatchedLender {
  lender: DetailedLender;
  score: number;
  reasons: string[];
  softMisses: string[];
  indicativeMonthly?: number;
  displayRate: string;
  badge?: "Recommended" | "Top pick";
}

/* ------------------------------------------------------------------ */
/*  Indicative monthly repayment (amortising loan)                     */
/* ------------------------------------------------------------------ */
function indicativeMonthlyRepayment(P: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return P / months;
  return (P * r) / (1 - Math.pow(1 + r, -months));
}

/* ------------------------------------------------------------------ */
/*  Favored-lender boosts                                              */
/* ------------------------------------------------------------------ */
const FAVORED: Record<string, number> = {
  ondeck: -8,
  prospa: -6,
  lumi: -6,
  trucap: -6,
  bizcap: -5,
};

/* ------------------------------------------------------------------ */
/*  Matching function                                                  */
/* ------------------------------------------------------------------ */
export function matchLenders(input: MatchInput): MatchedLender[] {
  const results: MatchedLender[] = [];
  const tradingMonths = tradingMonthsToNumber(input.yearsInBusiness);
  const monthlyRev = monthlyRevenueToNumber(input.monthlyRevenue);

  for (const lender of DETAILED_LENDERS) {
    const hero = lender.hero;
    let score = 0;
    const reasons: string[] = [];
    const softMisses: string[] = [];
    let excluded = false;

    // 1. Loan amount check
    if (hero.minLoan && hero.maxLoan) {
      if (input.loanAmount >= hero.minLoan && input.loanAmount <= hero.maxLoan) {
        reasons.push("Loan amount in range");
      } else if (input.loanAmount < hero.minLoan) {
        softMisses.push("Below minimum loan amount");
        score += 4;
      } else {
        softMisses.push("Above maximum — quote on application");
        score += 4;
      }
    }

    // 2. Trading months check
    if (hero.minTradingMonths) {
      if (tradingMonths >= hero.minTradingMonths) {
        reasons.push("Trading time meets requirements");
      } else if (tradingMonths >= hero.minTradingMonths * 0.7) {
        softMisses.push("Borderline trading time");
        score += 5;
      } else {
        excluded = true;
      }
    }

    // 3. Monthly revenue check
    if (hero.minMonthlyRevenue) {
      if (monthlyRev >= hero.minMonthlyRevenue) {
        reasons.push("Revenue threshold met");
      } else if (monthlyRev >= hero.minMonthlyRevenue * 0.7) {
        softMisses.push("Borderline revenue");
        score += 5;
      } else {
        excluded = true;
      }
    }

    if (excluded) continue;

    // 4. Property security
    if (input.hasPropertySecurity && (lender.propertyRequired === "optional" || lender.propertyRequired === "sometimes")) {
      reasons.push("Property security can improve terms");
      score -= 2;
    }

    // 5. Credit score adjustments
    if (input.creditScore === "poor" || input.creditScore === "fair") {
      if (hero.rateFrom && hero.rateFrom < 13) {
        softMisses.push("Credit profile may not meet threshold");
        score += 3;
      }
    }
    if (input.creditScore === "excellent") {
      score -= 1;
    }

    // 6. Fast funding bonus
    const ft = (lender.fastestFunding || "").toLowerCase();
    if (ft.includes("hour") || ft.includes("same-day") || ft.includes("same day")) {
      reasons.push("Fast funding available");
      score -= 2;
    }

    // 7. Published rate bonus
    if (hero.rateFrom) {
      score -= 1;
    }

    // 8. Favored lender boost
    const favoredBoost = FAVORED[lender.slug];
    if (favoredBoost !== undefined) {
      score += favoredBoost;
    }

    // Compute display rate
    let displayRate = hero.rateText || "";
    if (hero.rateFrom && hero.rateTo) {
      displayRate = `${hero.rateFrom}% – ${hero.rateTo}% p.a.`;
    } else if (hero.rateFrom) {
      displayRate = `from ${hero.rateFrom}% p.a.`;
    }

    // Compute indicative monthly
    let indicativeMonthly: number | undefined;
    if (hero.rateFrom && input.loanTerm > 0) {
      indicativeMonthly = indicativeMonthlyRepayment(input.loanAmount, hero.rateFrom, input.loanTerm);
    }

    // Badge
    let badge: "Recommended" | "Top pick" | undefined;
    if (lender.slug === "ondeck" && tradingMonths >= 12 && monthlyRev >= 8333 && input.loanAmount <= 250000) {
      badge = "Recommended";
    } else if (favoredBoost !== undefined && favoredBoost <= -5) {
      badge = "Top pick";
    }

    results.push({
      lender,
      score,
      reasons,
      softMisses,
      indicativeMonthly,
      displayRate,
      badge,
    });
  }

  // Sort ascending by score (lower = better match)
  results.sort((a, b) => a.score - b.score);
  return results;
}
