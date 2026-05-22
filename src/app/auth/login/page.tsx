"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    // Simulate login — replace with Supabase auth
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    window.location.href = "/portal";
  };

  return (
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-10">
          <Shield className="w-9 h-9 text-white" strokeWidth={1.5} />
          <span className="text-2xl font-bold text-white tracking-tight">
            Elevate<span className="text-gold-500">Lend</span>
          </span>
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-navy-900 text-center mb-1">Welcome back</h1>
          <p className="text-sm text-navy-500 text-center mb-8">Sign in to your ElevateLend portal</p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-1.5">
                <a href="#" className="text-xs text-gold-600 hover:text-gold-700">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button variant="primary" size="lg" className="w-full" type="submit" loading={loading}>
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-navy-500 mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-gold-600 font-semibold hover:text-gold-700">
              Create one
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-navy-500 mt-8">
          &copy; {new Date().getFullYear()} ElevateLend. All rights reserved.
        </p>
      </div>
    </div>
  );
}
