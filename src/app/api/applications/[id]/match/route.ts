import { NextRequest, NextResponse } from "next/server";
import { matchLenders } from "@/lib/lender-matching";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await getSupabase();

  // Get the application
  const { data: app, error: fetchError } = await supabase
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !app) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  // Run matching
  const matches = matchLenders({
    productType: app.product_type,
    loanAmount: app.loan_amount,
    loanTerm: app.loan_term,
    yearsInBusiness: app.years_in_business,
    annualRevenue: app.annual_revenue,
    creditScore: app.credit_score,
    hasPropertySecurity: app.has_property_security,
  });

  // Update application with matches
  const { error: updateError } = await supabase
    .from("applications")
    .update({
      lender_matches: matches,
      status: matches.length > 0 ? "matched" : "reviewing",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to save matches" }, { status: 500 });
  }

  return NextResponse.json({ matches, count: matches.length });
}
