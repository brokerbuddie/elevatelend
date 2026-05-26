import { NextRequest, NextResponse } from "next/server";

const ABN_LOOKUP_GUID = process.env.ABN_LOOKUP_GUID || "40b65ac5-b8ad-4a1f-8ea1-5bc6d0783672";

function unwrapJsonp(raw: string): unknown {
  const m = raw.match(/^[a-zA-Z0-9_$]+\((.*)\)$/s);
  if (m) return JSON.parse(m[1]);
  return JSON.parse(raw);
}

function tradingBand(months: number): string {
  if (months < 6) return "< 6 months";
  if (months < 12) return "6-12";
  if (months < 24) return "1-2";
  if (months < 60) return "2-5";
  return "5-plus";
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const abn = searchParams.get("abn");
  const q = searchParams.get("q");

  try {
    if (abn) {
      const digits = abn.replace(/\s/g, "");
      if (digits.length !== 11) {
        return NextResponse.json({ error: "ABN must be 11 digits" }, { status: 400 });
      }
      const url = `https://abr.business.gov.au/json/AbnDetails.aspx?abn=${digits}&guid=${ABN_LOOKUP_GUID}`;
      const res = await fetch(url, { next: { revalidate: 0 } });
      const raw = await res.text();
      const data = unwrapJsonp(raw) as Record<string, unknown>;

      if (!data || (data as Record<string, unknown>).Message) {
        return NextResponse.json({ error: (data as Record<string, unknown>).Message || "ABN not found" }, { status: 404 });
      }

      const entityName =
        (data.BusinessName as Array<Record<string, string>>)?.[0]?.Name ||
        (data.EntityName as Record<string, string>)?.Name ||
        "";

      const abnStatus = (data.AbnStatus as string) || "";
      const gstFrom = (data.Gst as string) || "";

      // Compute trading months from ABN effective date
      const effectiveFrom =
        (data.AbnStatusEffectiveFrom as string) ||
        (data.AbnStatusFromDate as string) ||
        (data.RecordLastUpdatedDate as string) ||
        "";

      let tradingMonths = 0;
      if (effectiveFrom) {
        const dateStr = effectiveFrom.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
        const startDate = new Date(dateStr);
        if (!isNaN(startDate.getTime())) {
          const now = new Date();
          tradingMonths = Math.floor(
            (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
          );
        }
      }

      const state = (data.AddressState as string) || "";
      const postcode = (data.AddressPostcode as string) || "";

      return NextResponse.json({
        abn: digits,
        entityName,
        businessName: entityName,
        abnStatus,
        gst: gstFrom,
        state,
        postcode,
        tradingMonths,
        tradingBand: tradingBand(tradingMonths),
      });
    }

    if (q && q.length >= 3) {
      const url = `https://abr.business.gov.au/json/MatchingNames.aspx?name=${encodeURIComponent(q)}&maxResults=10&guid=${ABN_LOOKUP_GUID}`;
      const res = await fetch(url, { next: { revalidate: 0 } });
      const raw = await res.text();
      const data = unwrapJsonp(raw) as Record<string, unknown>;

      const names = (data.Names as Array<Record<string, unknown>>) || [];
      const results = names.map((n) => ({
        abn: (n.Abn as string) || "",
        name: (n.Name as string) || "",
        state: (n.State as string) || "",
        postcode: (n.Postcode as string) || "",
        score: (n.Score as number) || 0,
        isCurrentName: (n.IsCurrentIndicator as string) === "Y",
      }));

      return NextResponse.json({ results });
    }

    return NextResponse.json({ error: "Provide ?abn=... or ?q=..." }, { status: 400 });
  } catch (err) {
    console.error("ABN lookup error:", err);
    return NextResponse.json({ error: "ABN lookup failed" }, { status: 500 });
  }
}
