import PrivacyPolicy from "@/components/custom/policyNcondition/PrivacyPolicy";
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";

export const metadata = {
  title: 'Privacy Policy - Accessibility Hire',
  description: 'Learn about how Accessibility Hire collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <PrivacyPolicy />
      <Footer />
    </main>
  );
}
