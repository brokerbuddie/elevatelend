"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StepProgress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, validateABN } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CreditCard,
  Car,
  Wrench,
  Landmark,
  Receipt,
  ShieldCheck,
  Lock,
  Users,
  Check,
  Loader2,
} from "lucide-react";

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
  annualRevenue: string;
  monthlyRevenue: string;
  creditScore: string;
  hasPropertySecurity: string;
  hasExistingDebts: string;
  existingDebtAmount: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  consentPrivacy: boolean;
  consentCredit: boolean;
  consentLender: boolean;
}

const initialFormData: FormData = {
  productType: "",
  loanAmount: 100000,
  loanTerm: 24,
  loanPurposes: [],
  businessName: "",
  abn: "",
  industry: "",
  yearsInBusiness: "",
  annualRevenue: "",
  monthlyRevenue: "",
  creditScore: "",
  hasPropertySecurity: "",
  hasExistingDebts: "",
  existingDebtAmount: "",
  fullName: "",
  email: "",
  phone: "",
  notes: "",
  consentPrivacy: false,
  consentCredit: false,
  consentLender: false,
};

const productOptions = [
  { key: "business-loan", label: "Small Business Loan", range: "$10k – $750k", icon: Building2 },
  { key: "line-of-credit", label: "Line of Credit", range: "$5k – $750k", icon: CreditCard },
  { key: "vehicle-finance", label: "Vehicle Finance", range: "$10k – $500k", icon: Car },
  { key: "equipment-finance", label: "Equipment Finance", range: "$10k – $1M", icon: Wrench },
  { key: "commercial-property", label: "Commercial Property", range: "$200k – $5M", icon: Landmark },
  { key: "tax-ato-debt", label: "Tax & ATO Debt", range: "$10k – $750k", icon: Receipt },
];

const purposes = [
  "Working capital",
  "Equipment",
  "Vehicle",
  "Inventory",
  "Expansion",
  "Tax/GST/ATO",
  "Marketing",
  "Fitout/renovation",
  "Hiring/payroll",
  "Other",
];

const industries = [
  { value: "construction", label: "Construction" },
  { value: "retail", label: "Retail" },
  { value: "hospitality", label: "Hospitality" },
  { value: "transport", label: "Transport" },
  { value: "professional-services", label: "Professional Services" },
  { value: "healthcare", label: "Healthcare" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "agriculture", label: "Agriculture" },
  { value: "mining", label: "Mining" },
  { value: "technology", label: "Technology" },
  { value: "other", label: "Other" },
];

const revenueRanges = [
  { value: "under-100k", label: "Under $100k" },
  { value: "100k-250k", label: "$100k – $250k" },
  { value: "250k-500k", label: "$250k – $500k" },
  { value: "500k-1m", label: "$500k – $1M" },
  { value: "1m-2m", label: "$1M – $2M" },
  { value: "2m-5m", label: "$2M – $5M" },
  { value: "5m-plus", label: "$5M+" },
];

const yearsOptions = [
  { value: "0-1", label: "0 – 1 year" },
  { value: "1-2", label: "1 – 2 years" },
  { value: "2-5", label: "2 – 5 years" },
  { value: "5-10", label: "5 – 10 years" },
  { value: "10-plus", label: "10+ years" },
];

const creditOptions = [
  { value: "excellent", label: "Excellent (800+)" },
  { value: "good", label: "Good (650–799)" },
  { value: "fair", label: "Fair (500–649)" },
  { value: "poor", label: "Poor (below 500)" },
  { value: "unsure", label: "Not sure" },
];

/* ------------------------------------------------------------------ */
/*  Step 1 — Loan Details                                              */
/* ------------------------------------------------------------------ */
function Step1({
  form,
  setForm,
  errors,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}) {
  const togglePurpose = (p: string) => {
    setForm((prev) => ({
      ...prev,
      loanPurposes: prev.loanPurposes.includes(p)
        ? prev.loanPurposes.filter((x) => x !== p)
        : [...prev.loanPurposes, p],
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-1">What funding do you need?</h2>
        <p className="text-sm text-navy-500">Select your loan type and tell us how much you need.</p>
      </div>

      {/* Product selector */}
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-3">Product type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {productOptions.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, productType: p.key }))}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer text-center",
                form.productType === p.key
                  ? "border-gold-500 bg-gold-50 shadow-md shadow-gold-500/10"
                  : "border-navy-100 hover:border-navy-200 bg-white"
              )}
            >
              <p.icon
                className={cn(
                  "w-7 h-7",
                  form.productType === p.key ? "text-gold-600" : "text-navy-400"
                )}
              />
              <span className="text-sm font-semibold text-navy-900">{p.label}</span>
              <span className="text-xs text-navy-400">{p.range}</span>
            </button>
          ))}
        </div>
        {errors.productType && <p className="text-xs text-error mt-2">{errors.productType}</p>}
      </div>

      {/* Loan amount slider */}
      <Slider
        label="Loan Amount"
        min={5000}
        max={5000000}
        step={5000}
        value={form.loanAmount}
        onChange={(v) => setForm((prev) => ({ ...prev, loanAmount: v }))}
      />

      {/* Term slider */}
      <Slider
        label="Preferred Term"
        min={3}
        max={60}
        step={3}
        value={form.loanTerm}
        onChange={(v) => setForm((prev) => ({ ...prev, loanTerm: v }))}
        formatValue={(v) => (v >= 12 ? `${(v / 12).toFixed(v % 12 === 0 ? 0 : 1)} year${v >= 24 ? "s" : ""}` : `${v} months`)}
      />

      {/* Loan purposes */}
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-3">Loan purpose (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {purposes.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePurpose(p)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer",
                form.loanPurposes.includes(p)
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-navy-600 border-navy-200 hover:border-navy-300"
              )}
            >
              {form.loanPurposes.includes(p) && <Check className="w-3.5 h-3.5 inline mr-1.5" />}
              {p}
            </button>
          ))}
        </div>
        {errors.loanPurposes && <p className="text-xs text-error mt-2">{errors.loanPurposes}</p>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — Business Details                                          */
/* ------------------------------------------------------------------ */
function Step2({
  form,
  setForm,
  errors,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-1">About your business</h2>
        <p className="text-sm text-navy-500">Help us match you with the right lenders.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Business Name"
          placeholder="e.g. Mitchell Construction Pty Ltd"
          value={form.businessName}
          onChange={(e) => setForm((prev) => ({ ...prev, businessName: e.target.value }))}
          error={errors.businessName}
        />
        <Input
          label="ABN"
          placeholder="00 000 000 000"
          value={form.abn}
          onChange={(e) => {
            const v = e.target.value.replace(/[^\d\s]/g, "").slice(0, 14);
            setForm((prev) => ({ ...prev, abn: v }));
          }}
          error={errors.abn}
          hint="11-digit Australian Business Number"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="Industry"
          options={industries}
          placeholder="Select industry"
          value={form.industry}
          onChange={(e) => setForm((prev) => ({ ...prev, industry: e.target.value }))}
          error={errors.industry}
        />
        <Select
          label="Years in Business"
          options={yearsOptions}
          placeholder="Select range"
          value={form.yearsInBusiness}
          onChange={(e) => setForm((prev) => ({ ...prev, yearsInBusiness: e.target.value }))}
          error={errors.yearsInBusiness}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="Annual Revenue"
          options={revenueRanges}
          placeholder="Select range"
          value={form.annualRevenue}
          onChange={(e) => setForm((prev) => ({ ...prev, annualRevenue: e.target.value }))}
          error={errors.annualRevenue}
        />
        <Input
          label="Monthly Revenue (approx)"
          placeholder="e.g. 50000"
          type="number"
          value={form.monthlyRevenue}
          onChange={(e) => setForm((prev) => ({ ...prev, monthlyRevenue: e.target.value }))}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Select
          label="Credit Score"
          options={creditOptions}
          placeholder="Select range"
          value={form.creditScore}
          onChange={(e) => setForm((prev) => ({ ...prev, creditScore: e.target.value }))}
          error={errors.creditScore}
        />
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">Property security available?</label>
          <div className="flex gap-3 mt-1">
            {["Yes", "No"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, hasPropertySecurity: opt.toLowerCase() }))}
                className={cn(
                  "flex-1 h-11 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer",
                  form.hasPropertySecurity === opt.toLowerCase()
                    ? "border-gold-500 bg-gold-50 text-gold-700"
                    : "border-navy-200 text-navy-600 hover:border-navy-300"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-700 mb-1.5">Existing business debts?</label>
        <div className="flex gap-3">
          {["Yes", "No"].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, hasExistingDebts: opt.toLowerCase() }))}
              className={cn(
                "w-24 h-11 rounded-xl border-2 text-sm font-semibold transition-all cursor-pointer",
                form.hasExistingDebts === opt.toLowerCase()
                  ? "border-gold-500 bg-gold-50 text-gold-700"
                  : "border-navy-200 text-navy-600 hover:border-navy-300"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        {form.hasExistingDebts === "yes" && (
          <div className="mt-3">
            <Input
              label="Approximate total debt"
              placeholder="e.g. 50000"
              type="number"
              value={form.existingDebtAmount}
              onChange={(e) => setForm((prev) => ({ ...prev, existingDebtAmount: e.target.value }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Your Details                                              */
/* ------------------------------------------------------------------ */
function Step3({
  form,
  setForm,
  errors,
}: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy-900 mb-1">Your contact details</h2>
        <p className="text-sm text-navy-500">We will use these to send your matched offers.</p>
      </div>

      <Input
        label="Full Name"
        placeholder="e.g. Sarah Mitchell"
        value={form.fullName}
        onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
        error={errors.fullName}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Email"
          type="email"
          placeholder="sarah@example.com.au"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          error={errors.email}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="0400 000 000"
          value={form.phone}
          onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          error={errors.phone}
        />
      </div>

      <Textarea
        label="Additional notes (optional)"
        placeholder="Any extra details that might help us match you better..."
        value={form.notes}
        onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
      />

      {/* Consent checkboxes */}
      <div className="space-y-3 bg-navy-50 rounded-xl p-5">
        <p className="text-sm font-semibold text-navy-800 mb-2">Consent & Privacy</p>
        {[
          {
            key: "consentPrivacy" as const,
            label: (
              <>
                I have read and agree to the{" "}
                <a href="/privacy" target="_blank" className="text-gold-600 underline">
                  Privacy Policy
                </a>
              </>
            ),
          },
          {
            key: "consentCredit" as const,
            label: "I consent to a credit information check being conducted",
          },
          {
            key: "consentLender" as const,
            label: "I consent to my details being shared with matched lender partners",
          },
        ].map((c) => (
          <label key={c.key} className="flex items-start gap-3 cursor-pointer group">
            <div className="mt-0.5">
              <input
                type="checkbox"
                checked={form[c.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [c.key]: e.target.checked }))}
                className="sr-only peer"
              />
              <div
                className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                  form[c.key]
                    ? "bg-navy-900 border-navy-900"
                    : "border-navy-300 group-hover:border-navy-400"
                )}
              >
                {form[c.key] && <Check className="w-3.5 h-3.5 text-white" />}
              </div>
            </div>
            <span className="text-sm text-navy-600">{c.label}</span>
          </label>
        ))}
        {errors.consent && <p className="text-xs text-error">{errors.consent}</p>}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  APPLY PAGE                                                         */
/* ================================================================== */
export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!form.productType) errs.productType = "Please select a product type";
      if (form.loanPurposes.length === 0) errs.loanPurposes = "Please select at least one purpose";
    }
    if (step === 1) {
      if (!form.businessName.trim()) errs.businessName = "Business name is required";
      if (!form.abn.trim()) {
        errs.abn = "ABN is required";
      } else if (!validateABN(form.abn)) {
        errs.abn = "Please enter a valid 11-digit ABN";
      }
      if (!form.industry) errs.industry = "Please select an industry";
      if (!form.yearsInBusiness) errs.yearsInBusiness = "Required";
      if (!form.annualRevenue) errs.annualRevenue = "Required";
      if (!form.creditScore) errs.creditScore = "Required";
    }
    if (step === 2) {
      if (!form.fullName.trim()) errs.fullName = "Full name is required";
      if (!form.email.trim()) {
        errs.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errs.email = "Please enter a valid email";
      }
      if (!form.phone.trim()) {
        errs.phone = "Phone is required";
      } else if (form.phone.replace(/\D/g, "").length < 10) {
        errs.phone = "Please enter a valid Australian phone number";
      }
      if (!form.consentPrivacy || !form.consentCredit || !form.consentLender) {
        errs.consent = "All consent checkboxes must be checked to proceed";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [step, form]);

  const next = () => {
    if (validate()) setStep((s) => Math.min(s + 1, 2));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-3xl font-extrabold text-navy-900 mb-3">Application Submitted!</h1>
          <p className="text-navy-500 max-w-md mx-auto mb-8">
            Thank you, {form.fullName.split(" ")[0]}. We are matching your application with our
            lender partners right now. You will hear from us within the hour.
          </p>
          <div className="bg-white rounded-2xl border border-navy-100 p-6 text-left max-w-sm mx-auto mb-8">
            <h3 className="font-semibold text-navy-900 mb-3">Application Summary</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-navy-500">Product</dt>
                <dd className="font-medium text-navy-900">
                  {productOptions.find((p) => p.key === form.productType)?.label}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy-500">Amount</dt>
                <dd className="font-medium text-navy-900">{formatCurrency(form.loanAmount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy-500">Business</dt>
                <dd className="font-medium text-navy-900">{form.businessName}</dd>
              </div>
            </dl>
          </div>
          <p className="text-xs text-navy-400">
            Reference number: EL-{Date.now().toString(36).toUpperCase()}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
      {/* Progress */}
      <div className="max-w-xl mx-auto mb-10">
        <StepProgress
          steps={["Loan Details", "Business Details", "Your Details"]}
          currentStep={step}
        />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Form area */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && <Step1 form={form} setForm={setForm} errors={errors} />}
                {step === 1 && <Step2 form={form} setForm={setForm} errors={errors} />}
                {step === 2 && <Step3 form={form} setForm={setForm} errors={errors} />}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-navy-100">
              {step > 0 ? (
                <Button variant="ghost" onClick={back}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              {step < 2 ? (
                <Button variant="primary" onClick={next}>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="primary" size="lg" onClick={submit} loading={submitting}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar trust signals */}
        <div className="hidden lg:block space-y-4">
          <Card className="bg-navy-900 border-none text-white">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-bold text-lg">Why ElevateLend?</h3>
              {[
                { icon: Lock, text: "256-bit bank-grade encryption" },
                { icon: ShieldCheck, text: "No impact on your credit score" },
                { icon: Users, text: "75+ lender partners" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <span className="text-sm text-navy-200">{item.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-gold-400 text-gold-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-navy-600 italic">
                &ldquo;Fastest business loan process I have experienced. Funded in under 24 hours.&rdquo;
              </p>
              <p className="text-xs text-navy-400 mt-2">— James H., Melbourne</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
