"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const links = [
    { label: "Products", href: "/#products" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Lenders", href: "/#lenders" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-900/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl lg:hidden"
          >
            <div className="p-6 pt-24 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="block py-3 px-4 text-navy-700 font-medium text-base rounded-xl hover:bg-navy-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-4 border-navy-100" />
              <a
                href="tel:1300000000"
                className="flex items-center gap-3 py-3 px-4 text-navy-600 font-medium rounded-xl hover:bg-navy-50"
              >
                <Phone className="w-5 h-5" />
                1300 000 000
              </a>
              <div className="mt-4">
                <Link href="/apply" onClick={onClose}>
                  <Button variant="primary" size="lg" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
