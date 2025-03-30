"use client";
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const Terms = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = React.useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Set the date on the client side
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

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
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Terms and Conditions
          </h1>
          <div className="space-y-4 text-sm lg:text-base">
            {/* Content */}
            <div className="space-y-6">
              <div id="terms" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Terms</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  By accessing this Website, accessible from Accessibility Hire, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
                </p>
              </div>

              <div id="use-license" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Use License</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Permission is granted to temporarily download one copy of the materials (information or software) on Accessibility Hire's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                  <li>modify or copy the materials;</li>
                  <li>use the materials for any commercial purpose or for any public display;</li>
                  <li>attempt to reverse engineer any software contained on Accessibility Hire's Website;</li>
                  <li>remove any copyright or other proprietary notations from the materials; or</li>
                  <li>transfer the materials to another person or 'mirror' the materials on any other server.</li>
                </ul>
              </div>

              <div id="disclaimer" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Disclaimer</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All the materials on Accessibility Hire's Website are provided "as is". Accessibility Hire makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Accessibility Hire does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
                </p>
              </div>

              <div id="limitations" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Limitations</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Accessibility Hire or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on Accessibility Hire's Website, even if Accessibility Hire or an authorized representative of this Website has been notified, orally or written, of the possibility of such damage.
                </p>
              </div>

              <div id="revisions" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Revisions and Errata</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  The materials appearing on Accessibility Hire's Website may include technical, typographical, or photographic errors. Accessibility Hire does not warrant that any of the materials on its Website are accurate, complete, or current. Accessibility Hire may make changes to the materials contained on its Website at any time without notice.
                </p>
              </div>

              <div id="links" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Links</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Accessibility Hire has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Accessibility Hire of the site. The use of any linked website is at the user's own risk.
                </p>
              </div>

              <div id="modifications" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Terms Modifications</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Accessibility Hire may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
                </p>
              </div>

              <div id="governing-law" className="scroll-mt-16">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Governing Law</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Any claim related to Accessibility Hire's Website shall be governed by the laws of the country without regards to its conflict of law provisions.
                </p>
              </div>

              <div className="mt-8">
                <p className="text-sm text-gray-500">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </div>
            {/* End Content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
