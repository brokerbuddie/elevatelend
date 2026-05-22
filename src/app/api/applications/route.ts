import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await getSupabase();

    // Validate required fields
    const required = ["productType", "loanAmount", "businessName", "abn", "fullName", "email", "phone"];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    // Record consent timestamps
    const consentRecord = {
      privacy: { agreed: body.consentPrivacy, timestamp: new Date().toISOString() },
      credit: { agreed: body.consentCredit, timestamp: new Date().toISOString() },
      lender: { agreed: body.consentLender, timestamp: new Date().toISOString() },
    };

    const applicationData = {
      product_type: body.productType,
      loan_amount: body.loanAmount,
      loan_term: body.loanTerm,
      loan_purposes: body.loanPurposes,
      business_name: body.businessName,
      abn: body.abn,
      industry: body.industry,
      years_in_business: body.yearsInBusiness,
      annual_revenue: body.annualRevenue,
      monthly_revenue: body.monthlyRevenue,
      credit_score: body.creditScore,
      has_property_security: body.hasPropertySecurity === "yes",
      has_existing_debts: body.hasExistingDebts === "yes",
      existing_debt_amount: body.existingDebtAmount || null,
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      notes: body.notes,
      consent: consentRecord,
      status: "submitted",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("applications")
      .insert(applicationData)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
    }

    return NextResponse.json({ success: true, application: data }, { status: 201 });
  } catch (err) {
    console.error("Application creation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabase.from("applications").select("*").order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }

    return NextResponse.json({ applications: data });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
