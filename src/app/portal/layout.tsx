"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Shield, LayoutDashboard, FileText, MessageSquare, FolderOpen, Settings, LogOut, Menu, X } from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "My Application", href: "/portal#application", icon: FileText },
  { label: "Messages", href: "/portal#messages", icon: MessageSquare },
  { label: "Documents", href: "/portal#documents", icon: FolderOpen },
  { label: "Settings", href: "/portal#settings", icon: Settings },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-navy-900/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-navy-900 text-white z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 flex items-center gap-2.5">
          <Shield className="w-7 h-7 text-white" strokeWidth={1.5} />
          <span className="text-lg font-bold tracking-tight">
            Elevate<span className="text-gold-500">Lend</span>
          </span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/10 text-white"
                  : "text-navy-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-navy-700">
          <Link
            href="/auth/login"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-navy-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-navy-100 h-16 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-navy-600 hover:bg-navy-50 rounded-lg mr-3 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-navy-900">Client Portal</h1>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
