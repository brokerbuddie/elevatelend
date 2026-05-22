"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Menu, X } from "lucide-react";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-navy-900/5 border-b border-navy-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <Shield
                  className={cn(
                    "w-9 h-9 transition-colors duration-300",
                    scrolled ? "text-navy-800" : "text-white"
                  )}
                  strokeWidth={1.5}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rotate-45 bg-gradient-to-br from-gold-500 to-gold-300 mt-0.5" />
                </div>
              </div>
              <span
                className={cn(
                  "text-xl font-bold tracking-tight transition-colors duration-300",
                  scrolled ? "text-navy-900" : "text-white"
                )}
              >
                Elevate<span className="text-gold-500">Lend</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: "Products", href: "/#products" },
                { label: "How it Works", href: "/#how-it-works" },
                { label: "Lenders", href: "/#lenders" },
                { label: "About", href: "/about" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 hover:text-gold-500",
                    scrolled ? "text-navy-600" : "text-white/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:1300000000"
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  scrolled ? "text-navy-600 hover:text-navy-800" : "text-white/80 hover:text-white"
                )}
              >
                <Phone className="w-4 h-4" />
                1300 000 000
              </a>
              <Link href="/apply">
                <Button variant="primary" size="md">
                  Apply Now
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors cursor-pointer",
                scrolled ? "text-navy-800 hover:bg-navy-50" : "text-white hover:bg-white/10"
              )}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
