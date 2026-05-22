"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  Building2,
  User,
  CreditCard,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const applicationData = {
  id: "EL-001",
  status: "matched",
  product: "Small Business Loan",
  amount: 150000,
  term: 24,
  purposes: ["Working capital", "Expansion"],
  business: {
    name: "Mitchell Construction Pty Ltd",
    abn: "53 004 085 616",
    industry: "Construction",
    yearsInBusiness: "5-10",
    annualRevenue: "$1M - $2M",
    monthlyRevenue: "$140,000",
    creditScore: "Good (650-799)",
    propertySecurity: "Yes",
    existingDebts: "No",
  },
  contact: {
    name: "Sarah Mitchell",
    email: "sarah@mitchellconstruction.com.au",
    phone: "0412 345 678",
    notes: "Looking to expand into commercial renovations. Need funds within 2 weeks.",
  },
  consent: {
    privacy: { agreed: true, timestamp: "2026-05-20T10:15:00Z" },
    credit: { agreed: true, timestamp: "2026-05-20T10:15:00Z" },
    lender: { agreed: true, timestamp: "2026-05-20T10:15:00Z" },
  },
  lenderMatches: [
    { name: "Prospa", score: 94, rateRange: "8.9% - 12.5%", decision: "Same day", status: "Reviewing" },
    { name: "OnDeck", score: 88, rateRange: "9.5% - 14.0%", decision: "24 hours", status: "Reviewing" },
    { name: "Moula", score: 82, rateRange: "10.0% - 15.5%", decision: "24 hours", status: "Pending" },
  ],
  messages: [
    { id: 1, from: "Admin", text: "Application looks great. Running lender matching now.", time: "20 May, 10:30 AM", isAdmin: true },
    { id: 2, from: "Sarah Mitchell", text: "Thanks! How long until I hear back?", time: "20 May, 11:00 AM", isAdmin: false },
    { id: 3, from: "Admin", text: "We have matched you with 3 lenders. Expect offers within 24 hours.", time: "20 May, 2:30 PM", isAdmin: true },
  ],
};

const statusOptions = ["submitted", "reviewing", "matched", "funded", "declined"];

export default function ApplicationDetailPage() {
  const params = useParams();
  const app = applicationData;
  const [status, setStatus] = useState(app.status);
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 text-sm text-navy-500 hover:text-navy-700 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Applications
        </Link>
        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-9 px-3 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 bg-white capitalize"
          >
            {statusOptions.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
          <Button variant="primary" size="sm">Update Status</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-navy-900">{app.contact.name}</h2>
        <Badge variant="gold">{status}</Badge>
        <span className="text-sm text-navy-400">Ref: {params.id}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-gold-500" />Loan Details</CardTitle></CardHeader>
          <CardContent className="p-6">
            <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div><dt className="text-navy-500">Product</dt><dd className="font-semibold text-navy-900 mt-0.5">{app.product}</dd></div>
              <div><dt className="text-navy-500">Amount</dt><dd className="font-semibold text-navy-900 mt-0.5">{formatCurrency(app.amount)}</dd></div>
              <div><dt className="text-navy-500">Term</dt><dd className="font-semibold text-navy-900 mt-0.5">{app.term} months</dd></div>
              <div><dt className="text-navy-500">Purposes</dt><dd className="font-semibold text-navy-900 mt-0.5">{app.purposes.join(", ")}</dd></div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-gold-500" />Business Details</CardTitle></CardHeader>
          <CardContent className="p-6">
            <dl className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              {Object.entries(app.business).map(([key, val]) => (
                <div key={key}>
                  <dt className="text-navy-500 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</dt>
                  <dd className="font-semibold text-navy-900 mt-0.5">{val}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-gold-500" />Contact Details</CardTitle></CardHeader>
          <CardContent className="p-6">
            <dl className="space-y-3 text-sm">
              <div><dt className="text-navy-500">Name</dt><dd className="font-semibold text-navy-900">{app.contact.name}</dd></div>
              <div><dt className="text-navy-500">Email</dt><dd className="font-semibold text-navy-900">{app.contact.email}</dd></div>
              <div><dt className="text-navy-500">Phone</dt><dd className="font-semibold text-navy-900">{app.contact.phone}</dd></div>
              {app.contact.notes && <div><dt className="text-navy-500">Notes</dt><dd className="font-medium text-navy-700 mt-1 bg-navy-50 rounded-lg p-3">{app.contact.notes}</dd></div>}
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-gold-500" />Consent Records</CardTitle></CardHeader>
          <CardContent className="p-6 space-y-3">
            {Object.entries(app.consent).map(([key, val]) => (
              <div key={key} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div className="text-sm">
                  <p className="font-medium text-navy-900 capitalize">{key} consent</p>
                  <p className="text-xs text-navy-400">Agreed on {new Date(val.timestamp).toLocaleString("en-AU")}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lender Matches</CardTitle>
            <Button variant="primary" size="sm">Run Matching</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100 bg-navy-50/50">
                <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase">Lender</th>
                <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase">Score</th>
                <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase">Rate Range</th>
                <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase">Decision</th>
                <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {app.lenderMatches.map((l) => (
                <tr key={l.name} className="border-b border-navy-50">
                  <td className="py-3 px-5 font-semibold text-navy-900">{l.name}</td>
                  <td className="py-3 px-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 flex items-center justify-center text-xs font-bold text-navy-900">{l.score}</div>
                  </td>
                  <td className="py-3 px-5 text-navy-700">{l.rateRange}</td>
                  <td className="py-3 px-5 text-navy-700">{l.decision}</td>
                  <td className="py-3 px-5"><Badge variant={l.status === "Reviewing" ? "warning" : "default"}>{l.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-gold-500" />Messages</CardTitle></CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
            {app.messages.map((msg) => (
              <div key={msg.id} className={`p-4 rounded-xl text-sm ${msg.isAdmin ? "bg-gold-50 border border-gold-200 ml-8" : "bg-navy-50 border border-navy-100"}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-navy-900">{msg.from}</span>
                  <span className="text-xs text-navy-400">{msg.time}</span>
                </div>
                <p className="text-navy-600">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Input placeholder="Type a message..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="flex-1" />
            <Button variant="primary" size="md"><Send className="w-4 h-4" />Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
