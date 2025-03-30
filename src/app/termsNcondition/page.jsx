import React from 'react';
import Terms from '@/components/custom/policyNcondition/Terms';
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";

export const metadata = {
  title: 'Terms & Conditions - Accessibility Hire',
  description: 'Read our terms and conditions to understand the rules and guidelines for using Accessibility Hire services.',
};

const TermsPage = () => {
  return (
    <main className="w-full bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="pt-24 pb-12">
        <Terms />
      </div>
      <Footer />
    </main>
  );
};

export default TermsPage;