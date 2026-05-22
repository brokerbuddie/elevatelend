import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = { title: "Terms of Service — ElevateLend" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-900 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
            <p className="mt-3 text-navy-300">Last updated: May 2026</p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-navy prose-sm">
            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">1. About Our Service</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              ElevateLend Pty Ltd operates a lending comparison platform that connects Australian businesses with licensed lender partners. We are a credit representative and do not provide loans directly. All lending decisions are made by our lender partners based on their own criteria and assessment processes.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">2. Eligibility</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              To use our services, you must be at least 18 years of age, an Australian resident or business operating in Australia, and have the authority to act on behalf of the business entity for which you are applying.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">3. No Guarantee of Approval</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Using our comparison service does not guarantee loan approval. All lending decisions are at the sole discretion of the lender partners. Interest rates, fees, terms, and conditions vary between lenders and are subject to individual assessment.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">4. Accuracy of Information</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              You agree to provide accurate, current, and complete information in your application. Providing false or misleading information may result in your application being declined and could constitute fraud under Australian law.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">5. Fees</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Our comparison service is free for borrowers. We receive a referral commission from lender partners when a loan settles. This does not affect the rates or terms offered to you by lenders.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">6. General Advice Warning</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Information provided on this website is general in nature and does not take into account your specific financial situation, objectives, or needs. You should consider whether the products mentioned are suitable for you and seek independent financial advice before making any decisions.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">7. Limitation of Liability</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              To the maximum extent permitted by Australian law, ElevateLend is not liable for any loss or damage arising from your use of our service, including any loss resulting from reliance on information provided or from the actions of our lender partners.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">8. Governing Law</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              These terms are governed by the laws of New South Wales, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts of New South Wales.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
