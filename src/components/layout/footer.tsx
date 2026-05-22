import Link from "next/link";
import { Shield, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Small Business Loans", href: "/apply" },
    { label: "Line of Credit", href: "/apply" },
    { label: "Vehicle Finance", href: "/apply" },
    { label: "Equipment Finance", href: "/apply" },
    { label: "Commercial Property", href: "/apply" },
    { label: "Tax & ATO Debt", href: "/apply" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How it Works", href: "/#how-it-works" },
    { label: "Our Lenders", href: "/#lenders" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Credit Guide", href: "/terms" },
    { label: "Complaints Policy", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-2 rotate-45 bg-gradient-to-br from-gold-500 to-gold-300 mt-0.5" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Elevate<span className="text-gold-500">Lend</span>
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm mb-6">
              Australia&apos;s premium business lending marketplace. We connect ambitious
              businesses with the right funding solutions from 75+ lender partners.
            </p>
            <div className="space-y-3 text-sm text-navy-300">
              <a href="tel:1300000000" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4" /> 1300 000 000
              </a>
              <a href="mailto:hello@elevatelend.com.au" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                <Mail className="w-4 h-4" /> hello@elevatelend.com.au
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Sydney, NSW Australia
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-300 hover:text-gold-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-14 pt-8 border-t border-navy-700">
          <p className="text-xs text-navy-400 leading-relaxed mb-4">
            ElevateLend Pty Ltd (ABN 00 000 000 000) is a credit representative (Credit Representative Number 000000)
            of Finance Broker Pty Ltd (Australian Credit Licence Number 000000). The information on this website is
            general in nature and does not constitute financial advice. All loan applications are subject to lender
            approval and individual assessment. Interest rates, fees, and terms vary between lenders. Past performance
            does not guarantee future results. Please read the relevant Product Disclosure Statement and consider
            whether the product is right for you before making any decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-navy-500">
              &copy; {new Date().getFullYear()} ElevateLend. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-navy-500">
              <Link href="/privacy" className="hover:text-gold-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gold-400 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
