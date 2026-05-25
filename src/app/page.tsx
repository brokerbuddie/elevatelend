"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Star,
  Building2,
  CreditCard,
  Car,
  Wrench,
  Landmark,
  Receipt,
  ClipboardList,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  BadgeCheck,
  TrendingUp,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                   */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section animation wrapper                                          */
/* ------------------------------------------------------------------ */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Icon with bounce-in and hover effects                     */
/* ------------------------------------------------------------------ */
function AnimatedIcon({
  icon: Icon,
  colorClass,
  delay = 0,
}: {
  icon: React.ElementType;
  colorClass: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 icon-container-hover group/icon overflow-visible`}
      initial={{ scale: 0, rotate: -30 }}
      animate={inView ? { scale: 1, rotate: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.5 },
      }}
    >
      {/* Morphing blob background */}
      <div className="blob-bg" />
      {/* Orbiting particle */}
      <div className="orbit-dot" />
      {/* Floating particles */}
      <div className="particle" style={{ top: "-8px", left: "50%", animationDelay: "0s" }} />
      <div className="particle" style={{ bottom: "-6px", right: "-4px", animationDelay: "1s" }} />
      <div className="particle" style={{ top: "50%", left: "-6px", animationDelay: "2s" }} />
      {/* Icon */}
      <Icon className="relative z-10 w-7 h-7 text-navy-700 icon-animate-hover" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Products data                                                      */
/* ------------------------------------------------------------------ */
const products = [
  {
    icon: Building2,
    title: "Small Business Loan",
    range: "$10k â $750k",
    description: "Flexible funding for growth, working capital, and expansion. Fast approval with competitive rates.",
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: CreditCard,
    title: "Line of Credit",
    range: "$5k â $750k",
    description: "Revolving credit facility. Draw funds as needed and only pay interest on what you use.",
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    icon: Car,
    title: "Vehicle Finance",
    range: "$10k â $500k",
    description: "Cars, utes, trucks, and fleet. Competitive rates with flexible balloon payment options.",
    color: "from-emerald-500/10 to-emerald-600/5",
  },
  {
    icon: Wrench,
    title: "Equipment Finance",
    range: "$10k â $1M",
    description: "Finance machinery, technology, and equipment. Preserve cash flow with fixed repayments.",
    color: "from-amber-500/10 to-amber-600/5",
  },
  {
    icon: Landmark,
    title: "Commercial Property",
    range: "$200k â $5M",
    description: "Purchase, refinance, or develop commercial and industrial property with tailored solutions.",
    color: "from-rose-500/10 to-rose-600/5",
  },
  {
    icon: Receipt,
    title: "Tax & ATO Debt",
    range: "$10k â $750k",
    description: "Resolve ATO obligations quickly. Consolidate tax debts with structured repayment plans.",
    color: "from-cyan-500/10 to-cyan-600/5",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials data                                                  */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    name: "Sarah Mitchell",
    business: "Mitchell & Co Construction",
    location: "Sydney, NSW",
    avatar: "/images/avatar-sarah.png",
    quote:
      "ElevateLend matched us with a lender in under 4 hours. We secured $350k for equipment at a rate 2% lower than our bank offered. Incredible service.",
    rating: 5,
  },
  {
    name: "James Huang",
    business: "Jade Garden Restaurants",
    location: "Melbourne, VIC",
    avatar: "/images/avatar-james.png",
    quote:
      "The application took 5 minutes. Within 24 hours we had three offers to choose from. The team guided us through every step. Highly recommend.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    business: "Thompson Transport Group",
    location: "Brisbane, QLD",
    avatar: "/images/avatar-lisa.png",
    quote:
      "We needed fleet finance fast. ElevateLend delivered. Five new trucks financed in a week. Their lender network is unmatched in Australia.",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    q: "Does applying affect my credit score?",
    a: "No. Our initial matching process uses a soft enquiry that does not affect your credit score. A formal credit check only occurs once you choose to proceed with a specific lender.",
  },
  {
    q: "How fast can I get funded?",
    a: "Many of our lender partners offer same-day or next-day approval. Once approved, funds can be deposited within 24 hours for most unsecured products.",
  },
  {
    q: "Is ElevateLend free to use?",
    a: "Yes, our comparison service is completely free for borrowers. We are paid a referral fee by the lender only when your loan settles, so there is no cost to you at any stage.",
  },
  {
    q: "What documents will I need?",
    a: "Typically you will need recent bank statements (3-6 months), your ABN details, and identification. Some lenders may request BAS statements or financial reports depending on the loan amount.",
  },
  {
    q: "What types of businesses can apply?",
    a: "We work with sole traders, partnerships, companies, and trusts across all industries. Whether you have been trading for 3 months or 30 years, we have lender options to suit.",
  },
  {
    q: "How many lenders will I be matched with?",
    a: "Our algorithm matches your profile against 75+ lenders and presents the top options. Most applicants receive 3-5 tailored offers to compare.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-navy-50/50 transition-colors cursor-pointer"
      >
        <span className="text-base font-semibold text-navy-900 pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 shrink-0 ${open ? "text-gold-500" : "text-navy-400"}`} />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm text-navy-500 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  HOME PAGE                                                          */
/* ================================================================== */
export default function HomePage() {
  return (
    <main className="bg-white">
      <Header />

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
        {/* Background grid + gradient */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800/90 to-navy-900" />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="hero-animate-delay-1">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium text-white/70">
                    Trusted by 1,200+ Australian businesses
                  </span>
                </div>
              </div>

              <h1
                className="hero-animate-delay-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight"
              >
                <span className="text-white">Elevate your </span>
                <span className="gradient-text">business funding.</span>
                <br />
                <span className="text-white">Sorted in minutes.</span>
              </h1>

              <p
                className="hero-animate-delay-2 mt-6 text-lg text-navy-300 max-w-xl leading-relaxed"
              >
                Compare 75+ Australian lenders in one free application. No credit
                hit, no obligations â just the best rates matched to your
                   business in minutes.
              </p>

              <div
                className="hero-animate-delay-3 mt-8 flex flex-wrap gap-4"
              >
                <Link href="/apply">
                  <Button variant="primary" size="xl">
                    Get My Free Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="secondary-light" size="xl">
                    How it Works
                  </Button>
                </a>
              </div>

              {/* Trust badges - animated icons */}
              <div
                className="hero-animate-delay-4 mt-10 flex flex-wrap items-center gap-6 text-sm text-navy-400"
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <ShieldCheck className="w-4 h-4 text-success" />
                  </motion.div>
                  <span>No credit hit</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
                  >
                    <Zap className="w-4 h-4 text-gold-400" />
                  </motion.div>
                  <span>24-hour funding</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Users className="w-4 h-4 text-blue-400" />
                  </motion.div>
                  <span>75+ lenders</span>
                </motion.div>
              </div>
            </div>

            {/* Right: Floating stat cards */}
            <div className="hidden lg:block relative h-[500px]">
              {/* Card 1 */}
              <motion.div
                className="absolute top-4 right-8"
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="animate-float glass rounded-2xl p-6 min-w-[220px]">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <TrendingUp className="w-5 h-5 text-gold-400" />
                    </motion.div>
                    <span className="text-sm text-white/60">Total Funded</span>
                  </div>
                  <p className="text-3xl font-bold text-white">$2.4B+</p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                className="absolute top-44 left-0"
                initial={{ opacity: 0, x: -40, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="animate-float glass rounded-2xl p-6 min-w-[200px]" style={{ animationDelay: "2s" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <BadgeCheck className="w-5 h-5 text-success" />
                    </motion.div>
                    <span className="text-sm text-white/60">Approval Rate</span>
                  </div>
                  <p className="text-3xl font-bold text-white">93%</p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                className="absolute bottom-8 right-16"
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="animate-float glass rounded-2xl p-6 min-w-[220px]" style={{ animationDelay: "4s" }}>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.4 + i * 0.1 }}
                      >
                        <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-white">4.9 / 5</p>
                  <p className="text-sm text-white/50 mt-1">from 680+ reviews</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ============================================================ */}
      {/*  STATS                                                        */}
      {/* ============================================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 1200, suffix: "+", label: "Funded Businesses", icon: Building2 },
              { value: 75, suffix: "+", label: "Lender Partners", icon: Users },
              { value: 4, suffix: "hrs", label: "Average Decision", icon: Clock },
              { value: 4.9, suffix: "/5", label: "Customer Rating", icon: Star },
            ].map((stat, i) => (
              <FadeInSection key={stat.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-navy-50 to-white border border-navy-100 gradient-border group">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className="w-8 h-8 text-gold-500 mx-auto mb-3 icon-animate-hover" />
                  </motion.div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-navy-900 stat-glow">
                    {stat.value === 4.9 ? (
                      "4.9/5"
                    ) : (
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <p className="text-sm text-navy-500 mt-1 font-medium">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PRODUCTS                                                     */}
      {/* ============================================================ */}
      <section id="products" className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-xs font-bold tracking-widest text-gold-500 uppercase mb-3">
                Our Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                Funding solutions for every business need
              </h2>
              <p className="mt-4 text-navy-500">
                From fast unsecured loans to long-term property finance, we
                connect you with the right product at the best rate.
              </p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <FadeInSection key={product.title} delay={i * 0.08}>
                <Link href="/apply">
                  <Card hover className="group h-full gradient-border">
                    <CardContent className="p-6">
                      <AnimatedIcon
                        icon={product.icon}
                        colorClass={product.color}
                        delay={i * 0.08}
                      />
                      <h3 className="text-lg font-bold text-navy-900 mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm font-semibold text-gold-500 mb-3">
                        {product.range}
                      </p>
                      <p className="text-sm text-navy-500 leading-relaxed">
                        {product.description}
                      </p>
                      <motion.div
                        className="mt-4 flex items-center gap-1 text-sm font-semibold text-navy-700 group-hover:text-gold-600 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        Learn more
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  HOW IT WORKS                                                 */}
      {/* ============================================================ */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block text-xs font-bold tracking-widest text-gold-500 uppercase mb-3">
                How it Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                Three simple steps to better funding
              </h2>
            </div>
          </FadeInSection>

          <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 opacity-20" />

            {[
              {
                step: "01",
                icon: ClipboardList,
                title: "Tell us what you need",
                desc: "Complete our 2-minute application. We only ask what matters â no paperwork, no fuss.",
                detail: "2-minute form",
              },
              {
                step: "02",
                icon: Search,
                title: "We match you to lenders",
                desc: "Our smart algorithm compares your profile against 75+ lenders to find the best fit.",
                detail: "Smart matching",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Compare offers & get funded",
                desc: "Review tailored offers, choose the best deal, and receive funds â often within 24 hours.",
                detail: "24hr funding",
              },
            ].map((item, i) => (
              <FadeInSection key={item.step} delay={i * 0.15}>
                <div className="relative text-center group">
                  <div className="relative inline-flex">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-navy-50 to-white border-2 border-navy-100 flex items-center justify-center mx-auto step-circle-animate"
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        <item.icon className="w-12 h-12 text-navy-700" />
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 flex items-center justify-center text-sm font-extrabold text-navy-900 shadow-lg shadow-gold-500/25"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        delay: 0.3 + i * 0.15,
                      }}
                    >
                      {item.step}
                    </motion.div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-navy-500 max-w-xs mx-auto leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="inline-block mt-3 text-xs font-bold text-gold-500 uppercase tracking-wider">
                    {item.detail}
                  </span>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection delay={0.4}>
            <div className="text-center mt-14">
              <Link href="/apply">
                <Button variant="primary" size="lg">
                  Start Your Free Application
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  LENDER LOGOS                                                 */}
      {/* ============================================================ */}
      <section id="lenders" className="py-20 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest text-gold-500 uppercase mb-3">
                Our Partners
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900">
                Trusted by 75+ Australian lenders
              </h2>
            </div>
          </FadeInSection>
          {/* Scrolling lender logos */}
          <div className="relative">
            <div className="flex gap-8 whitespace-nowrap" style={{ animation: "scroll 30s linear infinite" }}>
              {[
                "Prospa", "OnDeck", "Moula", "Lumi", "Zip Business",
                "ScotPac", "Judo Bank", "GetCapital", "Butn", "Shift",
                "Banjo", "Funding", "Bizcap", "Thinktank", "Liberty",
                "Pepper Money", "La Trobe", "Metro Finance", "Resimac", "Grow Finance",
              ].map((name) => (
                <div
                  key={name}
                  className="inline-flex items-center justify-center min-w-[150px] h-16 rounded-xl bg-white border border-navy-100 px-6 text-sm font-semibold text-navy-400 hover:border-gold-300 hover:text-navy-700 transition-all duration-300 hover:shadow-md"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                 */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block text-xs font-bold tracking-widest text-gold-500 uppercase mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
                Businesses that elevated their funding
              </h2>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 0.1}>
                <Card className="h-full relative overflow-hidden group gradient-border">
                  <CardContent className="p-6 flex flex-col h-full">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Quote className="w-8 h-8 text-gold-200 mb-4" />
                    </motion.div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, j) => (
                        <motion.div
                          key={j}
                          whileHover={{ scale: 1.3, rotate: 15 }}
                          transition={{ type: "spring" }}
                        >
                          <Star className="w-4 h-4 fill-gold-400 text-gold-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-navy-600 leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-4 border-t border-navy-100 flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                        <p className="text-xs text-navy-500">{t.business}</p>
                        <p className="text-xs text-navy-400">{t.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold tracking-widest text-gold-500 uppercase mb-3">
                FAQ
              </span>
              <h2 className="text-3xl font-extrabold text-navy-900">
                Common questions, clear answers
              </h2>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-navy-900" />
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Ready to find your perfect{" "}
              <span className="gradient-text">business loan?</span>
            </h2>
            <p className="mt-6 text-lg text-navy-300 max-w-xl mx-auto">
              Join 1,200+ Australian businesses who found better funding through
              ElevateLend. Free, fast, and no obligations.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/apply">
                <Button variant="primary" size="xl">
                  Get My Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:1300000000">
                <Button variant="secondary-light" size="xl">
                  Call 1300 000 000
                </Button>
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-navy-400">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <ShieldCheck className="w-4 h-4 text-success" />
                </motion.div>
                No credit hit
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Zap className="w-4 h-4 text-gold-400" />
                </motion.div>
                2-min application
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                </motion.div>
                100% free
              </motion.div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </main>
  );
}
