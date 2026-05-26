"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, validateABN } from "@/lib/utils";
import { matchLenders, type MatchedLender, type ExistingFacility } from "@/lib/lender-matching";
import { AU_LENDERS } from "@/content/au-lenders";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  X,
  Search,
  Building2,
  DollarSign,
  User,
  Clock,
  Zap,
  Shield,
  FileText,
  MessageSquare,
  Send,
  Landmark,
  CreditCard,
  Car,
  Wrench,
  Home,
  Receipt,
  Loader2,
  BadgeCheck,
  Star,
  ChevronDown,
  Link as LinkIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PRODUCT_TYPES = [
  { value: "small-business-loan", label: "Small Business Loan", icon: DollarSign },
  { value: "line-of-credit", label: "Line of Credit", icon: CreditCard },
  { value: "vehicle-finance", label: "Vehicle Finance", icon: Car },
  { value: "equipment-finance", label: "Equipment Finance", icon: Wrench },
  { value: "commercial-property", label: "Commercial Property", icon: Home },
  { value: "tax-ato-debt", label: "Tax & ATO Debt", icon: Receipt },
] as const;

const LOAN_PURPOSES = [
  "Working capital",
  "Expansion / growth",
  "Purchase inventory",
  "Equipment purchase",
  "Debt consolidation",
  "Cash-flow management",
  "Tax / BAS / ATO debt",
  "Fitout / renovation",
  "Marketing campaign",
  "Hire staff",
  "Vehicle purchase",
  "Other",
];

const MONTHLY_REVENUE_OPTIONS = [
  { value: "under-5k", label: "Under $5k" },
  { value: "5k-10k", label: "$5k – $10k" },
  { value: "10k-20k", label: "$10k – $20k" },
  { value: "20k-50k", label: "$20k – $50k" },
  { value: "50k-100k", label: "$50k – $100k" },
  { value: "100k-250k", label: "$100k – $250k" },
  { value: "250k-plus", label: "$250k+" },
];

const YEARS_IN_BUSINESS_OPTIONS = [
  { value: "0-6", label: "< 6 months" },
  { value: "6-12", label: "6 – 12 months" },
  { value: "1-2", label: "1 – 2 years" },
  { value: "2-5", label: "2 – 5 years" },
  { value: "5-plus", label: "5+ years" },
];

const INDUSTRY_OPTIONS = [
  { value: "construction", label: "Construction & Trades" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "hospitality", label: "Hospitality & Food" },
  { value: "professional-services", label: "Professional Services" },
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "transport", label: "Transport & Logistics" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "real-estate", label: "Real Estate & Property" },
  { value: "technology", label: "Technology & IT" },
  { value: "agriculture", label: "Agriculture & Farming" },
  { value: "education", label: "Education & Training" },
  { value: "automotive", label: "Automotive" },
  { value: "beauty", label: "Beauty & Personal Care" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "media", label: "Media & Advertising" },
  { value: "other", label: "Other" },
];

const CREDIT_SCORE_OPTIONS = [
  { value: "excellent", label: "Excellent (800+)" },
  { value: "good", label: "Good (700 – 799)" },
  { value: "fair", label: "Fair (500 – 699)" },
  { value: "poor", label: "Poor (below 500)" },
  { value: "unknown", label: "Not sure" },
];

const STEPS = [
  { id: 1, label: "Loan Details", icon: DollarSign },
  { id: 2, label: "Business Details", icon: Building2 },
  { id: 3, label: "Your Details", icon: User },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  productType: string;
  loanAmount: number;
  loanTerm: number;
  loanPurposes: string[];
  businessName: string;
  abn: string;
  industry: string;
  yearsInBusiness: string;
  monthlyRevenue: string;
  creditScore: string;
  hasPropertySecurity: boolean;
  existingFacilities: ExistingFacility[];
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  consentPrivacy: boolean;
  consentCredit: boolean;
  consentLender: boolean;
}

interface AbnLookupResult {
  abn: string;
  entityName: string;
  businessName: string;
  abnStatus: string;
  tradingMonths: number;
  tradingBand: string;
  state: string;
  postcode: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [matchedLenders, setMatchedLenders] = useState<MatchedLender[]>([]);
  const [portalMessages, setPortalMessages] = useState<{ text: string; from: string; time: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    productType: "",
    loanAmount: 50000,
    loanTerm: 12,
    loanPurposes: [],
    businessName: "",
    abn: "",
    industry: "",
    yearsInBusiness: "",
    monthlyRevenue: "",
    creditScore: "",
    hasPropertySecurity: false,
    existingFacilities: [],
    fullName: "",
    email: "",
    phone: "",
    notes: "",
    consentPrivacy: false,
    consentCredit: false,
    consentLender: false,
  });

  // ABN lookup state
  const [abnLoading, setAbnLoading] = useState(false);
  const [abnResult, setAbnResult] = useState<AbnLookupResult | null>(null);
  const [abnError, setAbnError] = useState("");
  const abnTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Existing lender search state
  const [lenderSearch, setLenderSearch] = useState("");
  const [lenderDropdownOpen, setLenderDropdownOpen] = useState(false);
  const lenderSearchRef = useRef<HTMLDivElement>(null);

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ---------------------------------------------------------------- */
  /*  ABN auto-lookup (debounced)                                      */
  /* ---------------------------------------------------------------- */
  const lookupAbn = useCallback(async (abn: string) => {
    const clean = abn.replace(/\s/g, "");
    if (clean.length !== 11) {
      setAbnResult(null);
      setAbnError("");
      return;
    }
    if (!validateABN(clean)) {
      setAbnError("Invalid ABN checksum");
      setAbnResult(null);
      return;
    }
    setAbnLoading(true);
    setAbnError("");
    try {
      const res = await fetch(`/api/abn?abn=${clean}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as Record<string, string>).error || "ABN lookup failed");
      }
      const data: AbnLookupResult = await res.json();
      setAbnResult(data);
      setFormData((prev) => ({
        ...prev,
        businessName: data.businessName || prev.businessName,
        yearsInBusiness: data.tradingBand || prev.yearsInBusiness,
      }));
    } catch (err) {
      setAbnError(err instanceof Error ? err.message : "ABN lookup failed");
      setAbnResult(null);
    } finally {
      setAbnLoading(false);
    }
  }, []);

  const handleAbnChange = useCallback(
    (val: string) => {
      // Allow digits and spaces only
      const formatted = val.replace(/[^\d\s]/g, "");
      setFormData((prev) => ({ ...prev, abn: formatted }));
      if (abnTimerRef.current) clearTimeout(abnTimerRef.current);
      abnTimerRef.current = setTimeout(() => lookupAbn(formatted), 600);
    },
    [lookupAbn]
  );

  /* ---------------------------------------------------------------- */
  /*  Existing lender search                                           */
  /* ---------------------------------------------------------------- */
  const selectedLenderNames = new Set(formData.existingFacilities.map((f) => f.name));
  const filteredLenders = lenderSearch.trim()
    ? AU_LENDERS.filter(
        (l) =>
          !selectedLenderNames.has(l.name) &&
          (l.name.toLowerCase().includes(lenderSearch.toLowerCase()) ||
            l.category.toLowerCase().includes(lenderSearch.toLowerCase()))
      ).slice(0, 50)
    : [];

  const addLender = useCallback((name: string, category: string) => {
    setFormData((prev) => ({
      ...prev,
      existingFacilities: [...prev.existingFacilities, { name, balance: "", category }],
    }));
    setLenderSearch("");
    setLenderDropdownOpen(false);
  }, []);

  const removeLender = useCallback((name: string) => {
    setFormData((prev) => ({
      ...prev,
      existingFacilities: prev.existingFacilities.filter((f) => f.name !== name),
    }));
  }, []);

  const updateLenderBalance = useCallback((name: string, balance: string) => {
    setFormData((prev) => ({
      ...prev,
      existingFacilities: prev.existingFacilities.map((f) =>
        f.name === name ? { ...f, balance } : f
      ),
    }));
  }, []);

  // Close lender dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (lenderSearchRef.current && !lenderSearchRef.current.contains(e.target as Node)) {
        setLenderDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Form helpers                                                     */
  /* ---------------------------------------------------------------- */
  const updateField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const togglePurpose = useCallback((purpose: string) => {
    setFormData((prev) => ({
      ...prev,
      loanPurposes: prev.loanPurposes.includes(purpose)
        ? prev.loanPurposes.filter((p) => p !== purpose)
        : [...prev.loanPurposes, purpose],
    }));
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Validation                                                       */
  /* ---------------------------------------------------------------- */
  const validateStep = useCallback(
    (s: number): boolean => {
      const errs: Record<string, string> = {};
      if (s === 1) {
        if (!formData.productType) errs.productType = "Select a product type";
        if (formData.loanAmount < 2000) errs.loanAmount = "Minimum loan is $2,000";
        if (formData.loanPurposes.length === 0) errs.loanPurposes = "Select at least one purpose";
      }
      if (s === 2) {
        if (!formData.businessName.trim()) errs.businessName = "Business name is required";
        if (!formData.industry) errs.industry = "Select an industry";
        if (!formData.yearsInBusiness) errs.yearsInBusiness = "Select years in business";
        if (!formData.monthlyRevenue) errs.monthlyRevenue = "Select monthly revenue";
        if (!formData.creditScore) errs.creditScore = "Select credit score range";
      }
      if (s === 3) {
        if (!formData.fullName.trim()) errs.fullName = "Full name is required";
        if (!formData.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Invalid email address";
        if (!formData.phone.trim()) errs.phone = "Phone number is required";
        if (!formData.consentPrivacy) errs.consentPrivacy = "You must accept the privacy policy";
        if (!formData.consentCredit) errs.consentCredit = "You must consent to credit checks";
        if (!formData.consentLender) errs.consentLender = "You must consent to lender sharing";
      }
      setErrors(errs);
      return Object.keys(errs).length === 0;
    },
    [formData]
  );

  const goNext = useCallback(() => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 3));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Submit                                                           */
  /* ---------------------------------------------------------------- */
  const handleSubmit = useCallback(async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);

    // Generate reference
    const ref = `EL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setReferenceNumber(ref);

    // Match lenders
    const matches = matchLenders({
      productType: formData.productType,
      loanAmount: formData.loanAmount,
      loanTerm: formData.loanTerm,
      monthlyRevenue: formData.monthlyRevenue,
      yearsInBusiness: formData.yearsInBusiness,
      creditScore: formData.creditScore,
      hasPropertySecurity: formData.hasPropertySecurity,
      existingFacilities: formData.existingFacilities,
    });
    setMatchedLenders(matches);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [formData, validateStep]);

  /* ---------------------------------------------------------------- */
  /*  Portal: send message                                             */
  /* ---------------------------------------------------------------- */
  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    setPortalMessages((prev) => [
      ...prev,
      {
        text: newMessage.trim(),
        from: formData.fullName || "You",
        time: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  }, [newMessage, formData.fullName]);

  /* ================================================================ */
  /*  PORTAL / CONFIRMATION VIEW                                       */
  /* ================================================================ */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white">
        {/* Header */}
        <div className="bg-navy-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <h1 className="text-2xl sm:text-3xl font-bold">Your Lending Options</h1>
                </div>
                <p className="text-navy-200 text-sm sm:text-base">
                  {formData.businessName} &mdash; Ref: <span className="font-mono text-gold-300">{referenceNumber}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-navy-300">Application submitted</p>
                <p className="text-sm text-navy-200">{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main: Matched Lenders */}
            <div className="lg:col-span-2 space-y-8">
              {/* Matched Lenders */}
              <div>
                <h2 className="text-xl font-bold text-navy-900 mb-1">Matched Lenders</h2>
                <p className="text-sm text-navy-500 mb-6">
                  {matchedLenders.length} lender{matchedLenders.length !== 1 ? "s" : ""} matched to your profile. Rates are indicative only.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {matchedLenders.slice(0, 12).map((ml, idx) => (
                    <Card key={ml.lender.slug} className="relative overflow-hidden">
                      {ml.badge && (
                        <div
                          className={cn(
                            "absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-xl",
                            ml.badge === "Recommended"
                              ? "bg-gold-500 text-navy-900"
                              : "bg-green-500 text-white"
                          )}
                        >
                          {ml.badge === "Recommended" ? (
                            <span className="flex items-center gap-1"><Star className="w-3 h-3" /> Recommended</span>
                          ) : (
                            <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3" /> Top pick</span>
                          )}
                        </div>
                      )}
                      <CardContent className="p-5">
                        <h3 className="font-bold text-navy-900 text-base mb-3 pr-20">{ml.lender.name}</h3>
                        <div className="space-y-2 text-sm">
                          {ml.displayRate && (
                            <div className="flex items-center justify-between">
                              <span className="text-navy-500">Rate</span>
                              <span className="font-semibold text-navy-800">{ml.displayRate}</span>
                            </div>
                          )}
                          {ml.lender.fastestDecision && (
                            <div className="flex items-center justify-between">
                              <span className="text-navy-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Decision</span>
                              <span className="text-navy-700">{ml.lender.fastestDecision}</span>
                            </div>
                          )}
                          {ml.lender.fastestFunding && (
                            <div className="flex items-center justify-between">
                              <span className="text-navy-500 flex items-center gap-1"><Zap className="w-3 h-3" /> Funding</span>
                              <span className="text-navy-700">{ml.lender.fastestFunding}</span>
                            </div>
                          )}
                          {ml.indicativeMonthly !== undefined && (
                            <div className="flex items-center justify-between pt-2 border-t border-navy-100">
                              <span className="text-navy-500">Est. monthly</span>
                              <span className="font-bold text-gold-600 text-base">{formatCurrency(Math.round(ml.indicativeMonthly))}</span>
                            </div>
                          )}
                        </div>
                        {ml.reasons.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {ml.reasons.slice(0, 3).map((r, ri) => (
                              <span key={ri} className="inline-block bg-green-50 text-green-700 text-[11px] px-2 py-0.5 rounded-full">
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                        {ml.softMisses.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {ml.softMisses.slice(0, 2).map((s, si) => (
                              <span key={si} className="inline-block bg-amber-50 text-amber-700 text-[11px] px-2 py-0.5 rounded-full">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {matchedLenders.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <p className="text-navy-500">No lenders matched your criteria. Our team will review your application and contact you with options.</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Bank Connection */}
              <Card className="border-2 border-dashed border-navy-200 bg-navy-50/50">
                <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center shrink-0">
                    <Landmark className="w-8 h-8 text-gold-600" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-navy-900 text-lg mb-1">Connect Your Bank</h3>
                    <p className="text-sm text-navy-500 mb-4">
                      Securely connect your bank for faster approval. Read-only access via bank-grade encryption. This step is optional but recommended.
                    </p>
                    <Button variant="primary" size="md" disabled>
                      <LinkIcon className="w-4 h-4" />
                      Connect Bank Account
                    </Button>
                    <p className="text-xs text-navy-400 mt-2">Coming soon &mdash; our team will reach out with next steps.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Messages */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-gold-500" />
                    Messages
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                    {portalMessages.length === 0 && (
                      <p className="text-sm text-navy-400 italic py-4 text-center">No messages yet. Send a message to our lending team below.</p>
                    )}
                    {portalMessages.map((msg, i) => (
                      <div key={i} className="bg-navy-50 rounded-xl px-4 py-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-navy-700">{msg.from}</span>
                          <span className="text-xs text-navy-400">{msg.time}</span>
                        </div>
                        <p className="text-sm text-navy-600">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button variant="primary" size="md" onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar: Application Summary */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-navy-900 text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold-500" />
                    Application Summary
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Reference</dt>
                      <dd className="font-mono text-navy-800 font-medium">{referenceNumber}</dd>
                    </div>
                    <div className="border-t border-navy-100" />
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Product</dt>
                      <dd className="text-navy-800">{PRODUCT_TYPES.find((p) => p.value === formData.productType)?.label || formData.productType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Loan Amount</dt>
                      <dd className="font-semibold text-navy-800">{formatCurrency(formData.loanAmount)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Term</dt>
                      <dd className="text-navy-800">{formData.loanTerm} months</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Purpose</dt>
                      <dd className="text-navy-800 text-right max-w-[160px]">{formData.loanPurposes.join(", ")}</dd>
                    </div>
                    <div className="border-t border-navy-100" />
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Business</dt>
                      <dd className="text-navy-800 text-right max-w-[160px]">{formData.businessName}</dd>
                    </div>
                    {formData.abn && (
                      <div className="flex justify-between">
                        <dt className="text-navy-500">ABN</dt>
                        <dd className="font-mono text-navy-800">{formData.abn}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Industry</dt>
                      <dd className="text-navy-800">{INDUSTRY_OPTIONS.find((o) => o.value === formData.industry)?.label || formData.industry}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Trading</dt>
                      <dd className="text-navy-800">{YEARS_IN_BUSINESS_OPTIONS.find((o) => o.value === formData.yearsInBusiness)?.label || formData.yearsInBusiness}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Monthly Revenue</dt>
                      <dd className="text-navy-800">{MONTHLY_REVENUE_OPTIONS.find((o) => o.value === formData.monthlyRevenue)?.label || formData.monthlyRevenue}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Property Security</dt>
                      <dd className="text-navy-800">{formData.hasPropertySecurity ? "Yes" : "No"}</dd>
                    </div>
                    {formData.existingFacilities.length > 0 && (
                      <>
                        <div className="border-t border-navy-100" />
                        <dt className="text-navy-500 text-xs uppercase tracking-wider">Existing Lenders</dt>
                        {formData.existingFacilities.map((f) => (
                          <div key={f.name} className="flex justify-between">
                            <dt className="text-navy-500">{f.name}</dt>
                            <dd className="text-navy-800">{f.balance ? `$${f.balance}` : "—"}</dd>
                          </div>
                        ))}
                      </>
                    )}
                    <div className="border-t border-navy-100" />
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Applicant</dt>
                      <dd className="text-navy-800">{formData.fullName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Email</dt>
                      <dd className="text-navy-800 text-right max-w-[180px] truncate">{formData.email}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-navy-500">Phone</dt>
                      <dd className="text-navy-800">{formData.phone}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="bg-gold-50 border-gold-200">
                <CardContent className="p-6 text-center">
                  <Shield className="w-10 h-10 text-gold-500 mx-auto mb-3" />
                  <h4 className="font-bold text-navy-900 mb-1">What happens next?</h4>
                  <p className="text-sm text-navy-600">
                    Our lending specialists will review your matched options and contact you within 2 business hours to discuss the best fit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  APPLICATION FORM                                                 */
  /* ================================================================ */
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white">
      {/* Header */}
      <div className="bg-navy-900 text-white py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Apply for Business Finance</h1>
          <p className="text-navy-200 text-sm sm:text-base max-w-lg mx-auto">
            Complete your application in under 5 minutes. Get matched to Australia&apos;s top business lenders instantly.
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-5">
        <div className="bg-white rounded-2xl shadow-lg border border-navy-100 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = step === s.id;
              const isComplete = step > s.id;
              return (
                <React.Fragment key={s.id}>
                  {idx > 0 && (
                    <div className="flex-1 mx-2 sm:mx-4">
                      <div className={cn("h-1 rounded-full transition-colors duration-300", isComplete ? "bg-gold-500" : "bg-navy-100")} />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                        isComplete
                          ? "bg-gold-500 text-navy-900"
                          : isActive
                          ? "bg-navy-900 text-white ring-4 ring-gold-500/30"
                          : "bg-navy-100 text-navy-400"
                      )}
                    >
                      {isComplete ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-medium hidden sm:inline",
                        isActive ? "text-navy-900" : isComplete ? "text-gold-600" : "text-navy-400"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Step 1: Loan Details */}
        {step === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-1">What type of finance do you need?</h2>
              <p className="text-sm text-navy-500 mb-5">Select the product that best fits your needs.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRODUCT_TYPES.map((pt) => {
                  const Icon = pt.icon;
                  const selected = formData.productType === pt.value;
                  return (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => updateField("productType", pt.value)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center",
                        selected
                          ? "border-gold-500 bg-gold-50 shadow-md shadow-gold-500/10"
                          : "border-navy-100 bg-white hover:border-navy-200 hover:shadow-sm"
                      )}
                    >
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          selected ? "bg-gold-500 text-navy-900" : "bg-navy-100 text-navy-500"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={cn("text-sm font-medium", selected ? "text-navy-900" : "text-navy-600")}>{pt.label}</span>
                    </button>
                  );
                })}
              </div>
              {errors.productType && <p className="text-xs text-red-500 font-medium mt-2">{errors.productType}</p>}
            </div>

            <Slider
              label="Loan Amount"
              min={2000}
              max={2000000}
              step={5000}
              value={formData.loanAmount}
              onChange={(v) => updateField("loanAmount", v)}
            />

            <Slider
              label="Loan Term"
              min={3}
              max={60}
              step={1}
              value={formData.loanTerm}
              onChange={(v) => updateField("loanTerm", v)}
              formatValue={(v) => `${v} months`}
            />

            <div>
              <h3 className="text-sm font-medium text-navy-700 mb-3">What is the loan for? <span className="text-navy-400">(select all that apply)</span></h3>
              <div className="flex flex-wrap gap-2">
                {LOAN_PURPOSES.map((p) => {
                  const selected = formData.loanPurposes.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePurpose(p)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer",
                        selected
                          ? "bg-gold-500 border-gold-500 text-navy-900"
                          : "bg-white border-navy-200 text-navy-600 hover:border-navy-300"
                      )}
                    >
                      {selected && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}
                      {p}
                    </button>
                  );
                })}
              </div>
              {errors.loanPurposes && <p className="text-xs text-red-500 font-medium mt-2">{errors.loanPurposes}</p>}
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="primary" size="lg" onClick={goNext}>
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Business Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-1">Tell us about your business</h2>
              <p className="text-sm text-navy-500 mb-5">We use this to match you with the right lenders.</p>
            </div>

            {/* ABN */}
            <div>
              <Input
                label="ABN"
                placeholder="e.g. 48 625 098 937"
                value={formData.abn}
                onChange={(e) => handleAbnChange(e.target.value)}
                hint="Enter your 11-digit ABN to auto-fill business details"
              />
              {abnLoading && (
                <div className="flex items-center gap-2 mt-2 text-sm text-navy-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Looking up ABN...
                </div>
              )}
              {abnError && <p className="text-xs text-red-500 font-medium mt-1">{abnError}</p>}
              {abnResult && (
                <div className="mt-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-green-600" />
                  <div>
                    <p className="font-medium">{abnResult.businessName}</p>
                    <p className="text-xs text-green-600">
                      ABN {abnResult.abn} &middot; Status: {abnResult.abnStatus} &middot; {abnResult.state} {abnResult.postcode}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Business name */}
            <Input
              label="Business Name"
              placeholder="e.g. Acme Pty Ltd"
              value={formData.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              error={errors.businessName}
            />

            {/* Industry */}
            <Select
              label="Industry"
              options={INDUSTRY_OPTIONS}
              placeholder="Select your industry"
              value={formData.industry}
              onChange={(e) => updateField("industry", e.target.value)}
              error={errors.industry}
            />

            {/* Years in business */}
            <Select
              label="Years in Business"
              options={YEARS_IN_BUSINESS_OPTIONS}
              placeholder="Select trading time"
              value={formData.yearsInBusiness}
              onChange={(e) => updateField("yearsInBusiness", e.target.value)}
              error={errors.yearsInBusiness}
            />

            {/* Monthly revenue */}
            <Select
              label="Monthly Revenue"
              options={MONTHLY_REVENUE_OPTIONS}
              placeholder="Select monthly revenue range"
              value={formData.monthlyRevenue}
              onChange={(e) => updateField("monthlyRevenue", e.target.value)}
              error={errors.monthlyRevenue}
            />

            {/* Credit score */}
            <Select
              label="Credit Score"
              options={CREDIT_SCORE_OPTIONS}
              placeholder="Select credit score range"
              value={formData.creditScore}
              onChange={(e) => updateField("creditScore", e.target.value)}
              error={errors.creditScore}
            />

            {/* Property security */}
            <div>
              <label className="text-sm font-medium text-navy-700 block mb-2">Do you have property to offer as security?</label>
              <div className="flex gap-3">
                {[
                  { label: "Yes", val: true },
                  { label: "No", val: false },
                ].map((opt) => (
                  <button
                    key={String(opt.val)}
                    type="button"
                    onClick={() => updateField("hasPropertySecurity", opt.val)}
                    className={cn(
                      "flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 cursor-pointer",
                      formData.hasPropertySecurity === opt.val
                        ? "border-gold-500 bg-gold-50 text-navy-900"
                        : "border-navy-100 bg-white text-navy-600 hover:border-navy-200"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Existing lenders */}
            <div ref={lenderSearchRef}>
              <label className="text-sm font-medium text-navy-700 block mb-2">
                Existing Business Lenders <span className="text-navy-400 font-normal">(optional)</span>
              </label>
              <p className="text-xs text-navy-400 mb-2">Search and select any current lenders you have outstanding balances with.</p>
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                  <input
                    type="text"
                    placeholder="Search lenders..."
                    value={lenderSearch}
                    onChange={(e) => {
                      setLenderSearch(e.target.value);
                      setLenderDropdownOpen(true);
                    }}
                    onFocus={() => {
                      if (lenderSearch.trim()) setLenderDropdownOpen(true);
                    }}
                    className="flex h-11 w-full rounded-xl border border-navy-200 bg-white pl-10 pr-4 py-2 text-sm text-navy-900 placeholder:text-navy-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 hover:border-navy-300"
                  />
                </div>
                {lenderDropdownOpen && filteredLenders.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-navy-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                    {filteredLenders.map((l) => (
                      <button
                        key={l.name}
                        type="button"
                        onClick={() => addLender(l.name, l.category)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-gold-50 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-navy-800 font-medium">{l.name}</span>
                        <span className="text-xs text-navy-400">{l.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected lenders with balance inputs */}
              {formData.existingFacilities.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.existingFacilities.map((f) => (
                    <div key={f.name} className="flex items-center gap-2 bg-navy-50 rounded-xl px-3 py-2">
                      <span className="text-sm font-medium text-navy-800 shrink-0">{f.name}</span>
                      {f.category && <span className="text-xs text-navy-400 shrink-0">({f.category})</span>}
                      <div className="flex-1 min-w-0" />
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-xs text-navy-500">Balance $</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          value={f.balance || ""}
                          onChang%={(e) => {
                            const val = e.target.value.replace(/[^\d]/g, "");
                            updateLenderBalance(f.name, val);
                          }}
                          className="w-24 h-8 rounded-lg border border-navy-200 bg-white px-2 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLender(f.name)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-navy-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="secondary" size="lg" onClick={goBack}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button variant="primary" size="lg" onClick={goNext}>
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Your Details */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-1">Your Details</h2>
              <p className="text-sm text-navy-500 mb-5">Tell us who we should contact about this application.</p>
            </div>

            <Input
              label="Full Name"
              placeholder="e.g. Jane Smith"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              error={errors.fullName}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="jane@business.com.au"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              error={errors.email}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="0400 000 000"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              error={errors.phone}
            />

            <Textarea
              label="Additional Notes"
              placeholder="Anything else we should know? (optional)"
              value={formData.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />

            {/* Consent checkboxes */}
            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-navy-700 block">Consent &amp; Agreements</label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.consentPrivacy}
                  onChange={(e) => updateField("consentPrivacy", e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-navy-300 text-gold-500 focus:ring-gold-500 cursor-pointer accent-amber-500"
                />
                <span className="text-sm text-navy-600 group-hover:text-navy-800 transition-colors">
                  I have read and accept the <a href="/privacy" target="_blank" className="text-gold-600 underline underline-offset-2">Privacy Policy</a> and <a href="/terms" target="_blank" className="text-gold-600 underline underline-offset-2">Terms of Service</a>.
                </span>
              </label>
              {errors.consentPrivacy && <p className="text-xs text-red-500 font-medium ml-8">{errors.consentPrivacy}</p>}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.consentCredit}
                  onChange={(e) => updateField("consentCredit", e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-navy-300 text-gold-500 focus:ring-gold-500 cursor-pointer accent-amber-500"
                />
                <span className="text-sm text-navy-600 group-hover:text-navy-800 transition-colors">
                  I consent to ElevateLend conducting a soft credit enquiry to assess my application. This will not affect my credit score.
                </span>
              </label>
              {errors.consentCredit && <p className="text-xs text-red-500 font-medium ml-8">{errors.consentCredit}</p>}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.consentLender}
                  onChange={(e) => updateField("consentLender", e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-navy-300 text-gold-500 focus:ring-gold-500 cursor-pointer accent-amber-500"
                />
                <span className="text-sm text-navy-600 group-hover:text-navy-800 transition-colors">
                  I consent to my information being shared with matched lending partners for the purpose of assessing my finance application.
                </span>
              </label>
              {errors.consentLender && <p className="text-xs text-red-500 font-medium ml-8">{errors.consentLender}</p>}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="secondary" size="lg" onClick={goBack}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button variant="primary" size="lg" onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Matching Lenders...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
