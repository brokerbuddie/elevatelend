/* ------------------------------------------------------------------ */
/*  Lender database (in production, store in Supabase)                 */
/* ------------------------------------------------------------------ */

export interface Lender {
  id: string;
  name: string;
  products: string[];
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  minBusinessAge: number; // years
  minRevenue: string; // revenue range key
  acceptedCreditScores: string[];
  requiresProperty: boolean;
  rateRange: string;
  decisionTime: string;
}

const lenders: Lender[] = [
  {
    id: "prospa",
    name: "Prospa",
    products: ["business-loan", "line-of-credit"],
    minAmount: 5000,
    maxAmount: 500000,
    minTerm: 3,
    maxTerm: 36,
    minBusinessAge: 0.5,
    minRevenue: "under-100k",
    acceptedCreditScores: ["excellent", "good", "fair", "unsure"],
    requiresProperty: false,
    rateRange: "8.9% – 21.5%",
    decisionTime: "Same day",
  },
  {
    id: "ondeck",
    name: "OnDeck",
    products: ["business-loan", "line-of-credit"],
    minAmount: 10000,
    maxAmount: 250000,
    minTerm: 6,
    maxTerm: 24,
    minBusinessAge: 1,
    minRevenue: "100k-250k",
    acceptedCreditScores: ["excellent", "good", "fair", "unsure"],
    requiresProperty: false,
    rateRange: "9.5% – 25.0%",
    decisionTime: "24 hours",
  },
  {
    id: "moula",
    name: "Moula",
    products: ["business-loan", "line-of-credit"],
    minAmount: 5000,
    maxAmount: 500000,
    minTerm: 6,
    maxTerm: 24,
    minBusinessAge: 1,
    minRevenue: "100k-250k",
    acceptedCreditScores: ["excellent", "good", "unsure"],
    requiresProperty: false,
    rateRange: "10.0% – 22.0%",
    decisionTime: "24 hours",
  },
  {
    id: "lumi",
    name: "Lumi",
    products: ["business-loan"],
    minAmount: 5000,
    maxAmount: 500000,
    minTerm: 3,
    maxTerm: 36,
    minBusinessAge: 0.5,
    minRevenue: "under-100k",
    acceptedCreditScores: ["excellent", "good", "fair", "poor", "unsure"],
    requiresProperty: false,
    rateRange: "12.0% – 30.0%",
    decisionTime: "Same day",
  },
  {
    id: "scotpac",
    name: "ScotPac",
    products: ["business-loan", "line-of-credit", "equipment-finance"],
    minAmount: 10000,
    maxAmount: 5000000,
    minTerm: 12,
    maxTerm: 60,
    minBusinessAge: 2,
    minRevenue: "500k-1m",
    acceptedCreditScores: ["excellent", "good"],
    requiresProperty: false,
    rateRange: "6.5% – 15.0%",
    decisionTime: "48 hours",
  },
  {
    id: "judo",
    name: "Judo Bank",
    products: ["business-loan", "commercial-property", "line-of-credit"],
    minAmount: 250000,
    maxAmount: 5000000,
    minTerm: 12,
    maxTerm: 60,
    minBusinessAge: 2,
    minRevenue: "1m-2m",
    acceptedCreditScores: ["excellent", "good"],
    requiresProperty: true,
    rateRange: "5.5% – 10.0%",
    decisionTime: "3–5 business days",
  },
  {
    id: "getcapital",
    name: "GetCapital",
    products: ["business-loan", "line-of-credit", "tax-ato-debt"],
    minAmount: 5000,
    maxAmount: 300000,
    minTerm: 3,
    maxTerm: 24,
    minBusinessAge: 0.5,
    minRevenue: "under-100k",
    acceptedCreditScores: ["excellent", "good", "fair", "unsure"],
    requiresProperty: false,
    rateRange: "9.0% – 22.0%",
    decisionTime: "Same day",
  },
  {
    id: "bizcap",
    name: "Bizcap",
    products: ["business-loan", "tax-ato-debt"],
    minAmount: 5000,
    maxAmount: 750000,
    minTerm: 3,
    maxTerm: 24,
    minBusinessAge: 0.5,
    minRevenue: "under-100k",
    acceptedCreditScores: ["excellent", "good", "fair", "poor", "unsure"],
    requiresProperty: false,
    rateRange: "11.0% – 35.0%",
    decisionTime: "Same day",
  },
  {
    id: "metro",
    name: "Metro Finance",
    products: ["vehicle-finance", "equipment-finance"],
    minAmount: 10000,
    maxAmount: 1000000,
    minTerm: 12,
    maxTerm: 60,
    minBusinessAge: 1,
    minRevenue: "100k-250k",
    acceptedCreditScores: ["excellent", "good", "fair", "unsure"],
    requiresProperty: false,
    rateRange: "5.5% – 12.0%",
    decisionTime: "24 hours",
  },
  {
    id: "pepper",
    name: "Pepper Money",
    products: ["vehicle-finance", "equipment-finance", "commercial-property"],
    minAmount: 10000,
    maxAmount: 2000000,
    minTerm: 12,
    maxTerm: 60,
    minBusinessAge: 1,
    minRevenue: "250k-500k",
    acceptedCreditScores: ["excellent", "good", "fair", "unsure"],
    requiresProperty: false,
    rateRange: "6.0% – 14.0%",
    decisionTime: "48 hours",
  },
  {
    id: "liberty",
    name: "Liberty Financial",
    products: ["commercial-property", "business-loan"],
    minAmount: 50000,
    maxAmount: 3000000,
    minTerm: 12,
    maxTerm: 60,
    minBusinessAge: 2,
    minRevenue: "500k-1m",
    acceptedCreditScores: ["excellent", "good", "fair", "unsure"],
    requiresProperty: true,
    rateRange: "5.9% – 11.0%",
    decisionTime: "3–5 business days",
  },
  {
    id: "thinktank",
    name: "Thinktank",
    products: ["commercial-property"],
    minAmount: 100000,
    maxAmount: 5000000,
    minTerm: 12,
    maxTerm: 60,
    minBusinessAge: 2,
    minRevenue: "500k-1m",
    acceptedCreditScores: ["excellent", "good"],
    requiresProperty: true,
    rateRange: "5.5% – 9.5%",
    decisionTime: "3–5 business days",
  },
];

/* ------------------------------------------------------------------ */
/*  Revenue rank helper                                                */
/* ------------------------------------------------------------------ */
const revenueRank: Record<string, number> = {
  "under-100k": 1,
  "100k-250k": 2,
  "250k-500k": 3,
  "500k-1m": 4,
  "1m-2m": 5,
  "2m-5m": 6,
  "5m-plus": 7,
};

const creditRank: Record<string, number> = {
  excellent: 5,
  good: 4,
  fair: 3,
  poor: 2,
  unsure: 3,
};

const businessAgeMap: Record<string, number> = {
  "0-1": 0.5,
  "1-2": 1.5,
  "2-5": 3.5,
  "5-10": 7.5,
  "10-plus": 15,
};

/* ------------------------------------------------------------------ */
/*  Matching function                                                  */
/* ------------------------------------------------------------------ */
export interface MatchInput {
  productType: string;
  loanAmount: number;
  loanTerm: number;
  yearsInBusiness: string;
  annualRevenue: string;
  creditScore: string;
  hasPropertySecurity: boolean;
}

export interface LenderMatch {
  lenderId: string;
  lenderName: string;
  score: number;
  rateRange: string;
  decisionTime: string;
  factors: Record<string, number>;
}

export function matchLenders(input: MatchInput): LenderMatch[] {
  const results: LenderMatch[] = [];
  const businessAge = businessAgeMap[input.yearsInBusiness] ?? 1;
  const revRank = revenueRank[input.annualRevenue] ?? 1;
  const credRank = creditRank[input.creditScore] ?? 3;

  for (const lender of lenders) {
    const factors: Record<string, number> = {};

    // 1. Product match (0 or 25)
    const productMatch = lender.products.includes(input.productType);
    factors.product = productMatch ? 25 : 0;
    if (!productMatch) continue; // skip entirely if no product match

    // 2. Amount fit (0-20)
    if (input.loanAmount >= lender.minAmount && input.loanAmount <= lender.maxAmount) {
      factors.amount = 20;
    } else if (input.loanAmount < lender.minAmount) {
      const ratio = input.loanAmount / lender.minAmount;
      factors.amount = Math.max(0, Math.round(ratio * 15));
    } else {
      const ratio = lender.maxAmount / input.loanAmount;
      factors.amount = Math.max(0, Math.round(ratio * 15));
    }

    // 3. Term fit (0-10)
    if (input.loanTerm >= lender.minTerm && input.loanTerm <= lender.maxTerm) {
      factors.term = 10;
    } else {
      factors.term = 3;
    }

    // 4. Business age (0-15)
    if (businessAge >= lender.minBusinessAge) {
      factors.businessAge = 15;
    } else {
      const ratio = businessAge / lender.minBusinessAge;
      factors.businessAge = Math.round(ratio * 10);
    }

    // 5. Revenue (0-10)
    const minRevRank = revenueRank[lender.minRevenue] ?? 1;
    if (revRank >= minRevRank) {
      factors.revenue = 10;
    } else {
      factors.revenue = Math.max(0, Math.round((revRank / minRevRank) * 7));
    }

    // 6. Credit score (0-10)
    if (lender.acceptedCreditScores.includes(input.creditScore)) {
      factors.credit = Math.min(10, 5 + credRank);
    } else {
      factors.credit = 0;
    }

    // 7. Property security bonus (0-10)
    if (lender.requiresProperty && input.hasPropertySecurity) {
      factors.property = 10;
    } else if (lender.requiresProperty && !input.hasPropertySecurity) {
      factors.property = -10;
    } else if (!lender.requiresProperty && input.hasPropertySecurity) {
      factors.property = 5;
    } else {
      factors.property = 0;
    }

    const score = Object.values(factors).reduce((sum, v) => sum + v, 0);
    const clampedScore = Math.max(0, Math.min(100, score));

    if (clampedScore >= 40) {
      results.push({
        lenderId: lender.id,
        lenderName: lender.name,
        score: clampedScore,
        rateRange: lender.rateRange,
        decisionTime: lender.decisionTime,
        factors,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return results;
}
