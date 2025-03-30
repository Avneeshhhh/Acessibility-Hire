"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const PrivacyPolicy = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // This ensures the page scrolls to top when mounted
    window.scrollTo(0, 0);
  }, [pathname]);

  // Handle section navigation
  const handleSectionNavigation = (sectionId) => {
    // First navigate to home page
    router.push('/');
    
    // After navigation, scroll to the section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Add this to your component's scope to handle navigation clicks
  useEffect(() => {
    const handleNavClick = (e) => {
      const target = e.target.closest('a');
      if (target) {
        const href = target.getAttribute('href');
        if (href?.startsWith('#')) {
          e.preventDefault();
          const sectionId = href.substring(1);
          handleSectionNavigation(sectionId);
        }
      }
    };

    // Add event listener
    document.addEventListener('click', handleNavClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleNavClick);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold mb-6 text-center text-gray-900">Privacy Policy</h1>
          <div className="space-y-4 text-sm lg:text-base">
            <div className="mb-8">
              <p className="font-bold text-gray-900 mb-4">PRIVACY NOTICE</p>
              <p className="text-gray-800 mb-4">Last updated {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* Introduction */}
            <div className="prose max-w-none text-gray-800">
              <p className="mb-8">
                Thank you for choosing to be part of our community at Accessibility Hire ("we", "us", or "our"). 
                We are committed to protecting your personal information and your right to privacy. If you have any 
                questions or concerns about our notice, or our practices with regards to your personal information, 
                please contact us at privacy@accessibilityhire.io.
              </p>
              
              <p className="mb-8">
                When you visit our website https://accessibilityhire.io, and use our services, you trust us with your 
                personal information. We take your privacy very seriously. In this privacy notice, we seek to explain 
                to you in the clearest way possible what information we collect, how we use it and what rights you 
                have in relation to it.
              </p>

              <p className="mb-8 font-bold text-gray-900">
                Please read this privacy notice carefully as it will help you make informed decisions about sharing 
                your personal information with us.
              </p>

              {/* Table of Contents */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">TABLE OF CONTENTS</h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-800">
                  <li>WHAT INFORMATION DO WE COLLECT?</li>
                  <li>HOW DO WE USE YOUR INFORMATION?</li>
                  <li>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</li>
                  <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
                  <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
                  <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
                  <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
                  <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
                  <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
                  <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
                  <li>DO WE MAKE UPDATES TO THIS POLICY?</li>
                  <li>HOW CAN YOU REQUEST YOUR DATA TO BE DELETED?</li>
                  <li>HOW CAN YOU CONTACT US ABOUT THIS POLICY?</li>
                  <li>VULNERABILITY DISCLOSURE</li>
                </ol>
              </div>

              {/* Sections */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
                <p className="font-bold text-gray-900 mb-2">Information automatically collected</p>
                <p className="italic text-gray-800 mb-4">In Short: Some information — such as IP address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
                <p className="text-gray-800">
                  We automatically collect certain information when you visit, use or navigate the Services. 
                  This information does not reveal your specific identity (like your name or contact information) 
                  but may include device and usage information, such as your IP address, browser and device 
                  characteristics, operating system, language preferences, referring URLs, device name, country, 
                  location, information about how and when you use our Services and other technical information.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. HOW DO WE USE YOUR INFORMATION?</h2>
                <p className="italic text-gray-800 mb-4">In Short: We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</p>
                <p className="text-gray-800">
                  We use personal information collected via our Services for a variety of business purposes 
                  described below. We process your personal information for these purposes in reliance on our 
                  legitimate business interests, in order to enter into or perform a contract with you, with your 
                  consent, and/or for compliance with our legal obligations.
                </p>
              </section>

              {/* Contact Section */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2>
                <p className="text-gray-800 mb-4">
                  If you have questions or comments about this policy, you may contact our Data Protection Officer (DPO) 
                  by email at privacy@accessibilityhire.io, or by post to:
                </p>
                <div className="mt-4 text-gray-800">
                  <p>Accessibility Hire, Inc</p>
                  <p>Data Protection Officer</p>
                  <p>123 Business Street</p>
                  <p>San Francisco, CA 94104</p>
                  <p>United States</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
