import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Shield, Target, Eye, Users, Award, TrendingUp } from "lucide-react";

export const metadata = { title: "About — ElevateLend" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-navy-900 pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              About <span className="gradient-text">ElevateLend</span>
            </h1>
            <p className="text-lg text-navy-300 max-w-2xl mx-auto leading-relaxed">
              We are on a mission to make business lending transparent, fast, and fair for every
              Australian business. By connecting borrowers with 75+ lender partners through smart
              technology, we ensure you always find the best deal.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-extrabold text-navy-900">What we stand for</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Trust & Transparency", desc: "No hidden fees, no surprises. We show you all your options upfront so you can make informed decisions." },
                { icon: Target, title: "Precision Matching", desc: "Our proprietary algorithm analyses your business profile against 75+ lenders to find genuinely suitable options." },
                { icon: Eye, title: "Complete Visibility", desc: "Track your application in real-time through your personal portal. We keep you informed at every step." },
                { icon: Users, title: "Human Support", desc: "Technology does the heavy lifting, but real lending specialists are always available when you need guidance." },
                { icon: Award, title: "Best-in-Class Partners", desc: "We only work with reputable, licensed Australian lenders who meet our strict quality standards." },
                { icon: TrendingUp, title: "Business-First", desc: "Every feature we build is designed to save you time and money so you can focus on growing your business." },
              ].map((v) => (
                <div key={v.title} className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-50 to-white border border-navy-100 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-gold-500" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-navy-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "$2.4B+", label: "Total Funded" },
                { value: "1,200+", label: "Businesses Helped" },
                { value: "75+", label: "Lender Partners" },
                { value: "4.9/5", label: "Customer Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-white mb-1">{s.value}</p>
                  <p className="text-sm text-navy-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team teaser */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold text-navy-900 mb-4">Built by lending veterans</h2>
            <p className="text-navy-500 leading-relaxed">
              Our team combines decades of experience in Australian commercial lending, fintech
              product development, and data science. We have been on both sides of the lending
              desk and built ElevateLend to solve the problems we saw firsthand — opaque
              processes, wasted time, and missed opportunities.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
