import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = { title: "Privacy Policy — ElevateLend" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-navy-900 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
            <p className="mt-3 text-navy-300">Last updated: May 2026</p>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 prose prose-navy prose-sm">
            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">1. Information We Collect</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              We collect information you provide directly when you apply for a loan comparison, create an account, or contact us. This includes your name, email address, phone number, business details (ABN, industry, revenue), and financial information relevant to your loan application. We also collect technical data such as your IP address, browser type, and device information when you visit our website.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">2. How We Use Your Information</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              We use your information to match you with suitable lenders, process your application, communicate with you about your application status, improve our services, comply with legal obligations, and send you relevant updates about our products (with your consent).
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">3. Information Sharing</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              We share your information with lender partners you have been matched with (with your consent), service providers who assist in operating our platform, and regulatory bodies as required by law. We do not sell your personal information to third parties.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">4. Credit Information</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              With your consent, we may access your credit information from credit reporting bodies to assist in matching you with appropriate lenders. Our initial assessment uses a soft enquiry that does not affect your credit score.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">5. Data Security</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              We use 256-bit encryption and industry-standard security measures to protect your data. All data is stored on secure servers within Australia. We regularly audit our security practices and maintain compliance with Australian Privacy Principles.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">6. Your Rights</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Under the Australian Privacy Act 1988, you have the right to access your personal information, request corrections, opt out of marketing communications, and lodge a complaint if you believe your privacy has been breached.
            </p>

            <h2 className="text-xl font-bold text-navy-900 mt-8 mb-3">7. Contact Us</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              If you have questions about this privacy policy or your data, please contact our Privacy Officer at privacy@elevatelend.com.au or call 1300 000 000.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
