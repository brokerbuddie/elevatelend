"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  Users,
  MessageSquare,
  Send,
  ArrowRight,
  AlertCircle,
  Star,
} from "lucide-react";

/* Demo data — in production this comes from Supabase */
const demoApplication = {
  id: "EL-ABC123",
  status: "matched" as const,
  product: "Small Business Loan",
  amount: 150000,
  term: 24,
  business: "Mitchell Construction Pty Ltd",
  submittedAt: "2026-05-20",
  timeline: [
    { label: "Application submitted", date: "20 May 2026", done: true },
    { label: "Under review", date: "20 May 2026", done: true },
    { label: "Matched with lenders", date: "20 May 2026", done: true },
    { label: "Offers received", date: "Pending", done: false },
    { label: "Funded", date: "Pending", done: false },
  ],
};

const demoLenders = [
  {
    name: "Prospa",
    matchScore: 94,
    rateRange: "8.9% – 12.5%",
    decisionTime: "Same day",
    status: "Reviewing",
  },
  {
    name: "OnDeck",
    matchScore: 88,
    rateRange: "9.5% – 14.0%",
    decisionTime: "24 hours",
    status: "Reviewing",
  },
  {
    name: "Moula",
    matchScore: 82,
    rateRange: "10.0% – 15.5%",
    decisionTime: "24 hours",
    status: "Pending",
  },
];

const demoMessages = [
  {
    id: 1,
    from: "ElevateLend Team",
    text: "Welcome to ElevateLend! Your application has been received and is being reviewed. We will update you shortly.",
    time: "20 May, 10:15 AM",
    isAdmin: true,
  },
  {
    id: 2,
    from: "ElevateLend Team",
    text: "Great news — we have matched you with 3 lenders. They are now reviewing your application.",
    time: "20 May, 2:30 PM",
    isAdmin: true,
  },
];

const statusConfig: Record<string, { badge: "info" | "warning" | "success" | "gold"; label: string }> = {
  submitted: { badge: "info", label: "Submitted" },
  reviewing: { badge: "warning", label: "Under Review" },
  matched: { badge: "gold", label: "Matched" },
  funded: { badge: "success", label: "Funded" },
};

export default function PortalPage() {
  const [newMessage, setNewMessage] = useState("");
  const app = demoApplication;
  const config = statusConfig[app.status];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-navy-900">Welcome back, Sarah</h2>
        <p className="text-sm text-navy-500">Here is the latest on your application.</p>
      </div>

      {/* Status card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-navy-900">{app.product}</h3>
                <Badge variant={config.badge}>{config.label}</Badge>
              </div>
              <p className="text-sm text-navy-500">
                {app.business} &middot; ${app.amount.toLocaleString()} over {app.term} months &middot; Ref: {app.id}
              </p>
            </div>
            <Button variant="secondary" size="sm">
              <FileText className="w-4 h-4" />
              View Full Application
            </Button>
          </div>

          {/* Timeline */}
          <div className="flex items-start gap-0 overflow-x-auto pb-2">
            {app.timeline.map((t, i) => (
              <div key={t.label} className="flex items-start min-w-[140px] flex-1">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      t.done
                        ? "bg-success text-white"
                        : "bg-navy-100 text-navy-400"
                    }`}
                  >
                    {t.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <p className="text-xs font-semibold text-navy-700 mt-2">{t.label}</p>
                  <p className="text-[10px] text-navy-400 mt-0.5">{t.date}</p>
                </div>
                {i < app.timeline.length - 1 && (
                  <div className={`flex-1 h-0.5 mt-4 mx-1 ${t.done ? "bg-success" : "bg-navy-100"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Matched lenders */}
      <div>
        <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-gold-500" />
          Matched Lenders
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {demoLenders.map((lender) => (
            <Card key={lender.name} hover>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-navy-900">{lender.name}</h4>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 flex items-center justify-center text-sm font-bold text-navy-900">
                    {lender.matchScore}
                  </div>
                </div>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-navy-500">Rate range</dt>
                    <dd className="font-medium text-navy-800">{lender.rateRange}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-500">Decision</dt>
                    <dd className="font-medium text-navy-800">{lender.decisionTime}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-navy-500">Status</dt>
                    <dd>
                      <Badge variant={lender.status === "Reviewing" ? "warning" : "default"}>
                        {lender.status}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gold-500" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {demoMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-xl text-sm ${
                  msg.isAdmin ? "bg-navy-50 border border-navy-100" : "bg-gold-50 border border-gold-200 ml-8"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-navy-900">{msg.from}</span>
                  <span className="text-xs text-navy-400">{msg.time}</span>
                </div>
                <p className="text-navy-600">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button variant="primary" size="md">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card hover className="cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-navy-900">Update Application</h4>
              <p className="text-xs text-navy-500">Add documents or update details</p>
            </div>
            <ArrowRight className="w-4 h-4 text-navy-400" />
          </CardContent>
        </Card>
        <Card hover className="cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gold-50 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-gold-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-navy-900">Contact Support</h4>
              <p className="text-xs text-navy-500">Speak to your lending specialist</p>
            </div>
            <ArrowRight className="w-4 h-4 text-navy-400" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
