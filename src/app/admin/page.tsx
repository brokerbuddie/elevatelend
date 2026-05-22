"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import {
  FileText,
  Clock,
  CheckCircle2,
  DollarSign,
  Search,
  ChevronDown,
  ChevronUp,
  Eye,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  { label: "Total Applications", value: 247, change: "+12%", icon: FileText, color: "bg-blue-50 text-blue-600" },
  { label: "Pending Review", value: 18, change: "-3", icon: Clock, color: "bg-amber-50 text-amber-600" },
  { label: "Matched", value: 42, change: "+8", icon: Users, color: "bg-purple-50 text-purple-600" },
  { label: "Funded This Month", value: 31, change: "+15%", icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
];

const demoApplications = [
  {
    id: "EL-001",
    name: "Sarah Mitchell",
    business: "Mitchell Construction",
    amount: 150000,
    product: "Small Business Loan",
    status: "matched" as const,
    date: "20 May 2026",
    industry: "Construction",
    matchCount: 3,
  },
  {
    id: "EL-002",
    name: "James Huang",
    business: "Jade Garden Restaurants",
    amount: 85000,
    product: "Equipment Finance",
    status: "reviewing" as const,
    date: "20 May 2026",
    industry: "Hospitality",
    matchCount: 0,
  },
  {
    id: "EL-003",
    name: "Lisa Thompson",
    business: "Thompson Transport Group",
    amount: 420000,
    product: "Vehicle Finance",
    status: "funded" as const,
    date: "19 May 2026",
    industry: "Transport",
    matchCount: 5,
  },
  {
    id: "EL-004",
    name: "David Chen",
    business: "TechStar Solutions",
    amount: 200000,
    product: "Line of Credit",
    status: "submitted" as const,
    date: "21 May 2026",
    industry: "Technology",
    matchCount: 0,
  },
  {
    id: "EL-005",
    name: "Emma Williams",
    business: "Williams Medical Practice",
    amount: 350000,
    product: "Commercial Property",
    status: "matched" as const,
    date: "18 May 2026",
    industry: "Healthcare",
    matchCount: 4,
  },
  {
    id: "EL-006",
    name: "Mark Johnson",
    business: "Johnson Retail Group",
    amount: 45000,
    product: "Tax & ATO Debt",
    status: "reviewing" as const,
    date: "21 May 2026",
    industry: "Retail",
    matchCount: 0,
  },
];

const statusMap: Record<string, { variant: "info" | "warning" | "gold" | "success"; label: string }> = {
  submitted: { variant: "info", label: "Submitted" },
  reviewing: { variant: "warning", label: "Reviewing" },
  matched: { variant: "gold", label: "Matched" },
  funded: { variant: "success", label: "Funded" },
};

export default function AdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = demoApplications.filter((app) => {
    const matchesSearch =
      !searchQuery ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-success flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-navy-900">{stat.value}</p>
              <p className="text-xs text-navy-500 mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Applications</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 pl-9 pr-4 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 px-3 rounded-lg border border-navy-200 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 appearance-none bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="subm	tted">Submitted</option>
                <option value="reviewing">Reviewing</option>
                <option value="matched">Matched</option>
                <option value="funded">Funded</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-100 bg-navy-50/50">
                  <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase tracking-wider">Applicant</th>
                  <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase tracking-wider">Amount</th>
                  <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase tracking-wider hidden md:table-cell">Product</th>
                  <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-5 font-semibold text-navy-600 text-xs uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-right py-3 px-5 font-semibold text-navy-600 text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => {
                  const st = statusMap[app.status];
                  const isExpanded = expandedRow === app.id;
                  return (
                    <React.Fragment key={app.id}>
                      <tr
                        className="border-b border-navy-50 hover:bg-navy-50/30 cursor-pointer transition-colors"
                        onClick={() => setExpandedRow(isExpanded ? null : app.id)}
                      >
                        <td className="py-3.5 px-5">
                          <div>
                            <p className="font-semibold text-navy-900">{app.name}</p>
                            <p className="text-xs text-navy-500">{app.business}</p>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 font-semibold text-navy-900">
                          {formatCurrency(app.amount)}
                        </td>
                        <td className="py-3.5 px-5 text-navy-600 hidden md:table-cell">{app.product}</td>
                        <td className="py-3.5 px-5">
                          <Badge variant={st.variant}>{st.label}</Badge>
                        </td>
                        <td className="py-3.5 px-5 text-navy-500 hidden lg:table-cell">{app.date}</td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/applications/${app.id}`}>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-navy-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-navy-400" />
                            )}
                          </div>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="p-5 bg-navy-50/30 border-b border-navy-100">
                            <div className="grid sm:grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-xs text-navy-500 font-medium mb-1">Industry</p>
                                <p className="text-navy-800 font-medium">{app.industry}</p>
                              </div>
                              <div>
                                <p className="text-xs text-navy-500 font-medium mb-1">Lender Matches</p>
                                <p className="text-navy-800 font-medium">{app.matchCount || "None yet"}</p>
                              </div>
                              <div>
                                <p className="text-xs text-navy-500 font-medium mb-1">Reference</p>
                                <p className="text-navy-800 font-medium">{app.id}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Link href={`/admin/applications/${app.id}`}>
                                <Button variant="primary" size="sm">
                                  View Full Details
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                              <Button variant="secondary" size="sm">
                                Run Matching
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-12 text-center text-navy-500">
              No applications match your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
