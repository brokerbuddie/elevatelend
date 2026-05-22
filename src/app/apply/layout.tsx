import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Apply — ElevateLend",
  description: "Start your free business loan application. Compare 75+ lenders in minutes.",
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">{children}</main>
      <Footer />
    </>
  );
}
