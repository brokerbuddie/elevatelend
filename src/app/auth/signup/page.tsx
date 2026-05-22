"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    window.location.href = "/portal";
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <Shield className="w-9 h-9 text-white" strokeWidth={1.5} />
          <span className="text-2xl font-bold text-white tracking-tight">
            Elevate<span className="text-gold-500">Lend</span>
          </span>
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-navy-900 text-center mb-1">Create your account</h1>
          <p className="text-sm text-navy-500 text-center mb-8">
            Track your application and manage your lending journey
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              placeholder="e.g. Sarah Mitchell"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              value={formData.password}
              onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirm}
              onChange={(e) => setFormData((p) => ({ ...p, confirm: e.target.value }))}
            />
            <Button variant="primary" size="lg" className="w-full" type="submit" loading={loading}>
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-navy-500 mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gold-600 font-semibold hover:text-gold-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
