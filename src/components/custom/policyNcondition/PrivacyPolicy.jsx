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
              <p className="text-gray-800 mb-4">Last Updated: Mar 1 2025</p>
            </div>

            {/* Privacy Policy Content */}
            <div className="prose max-w-none text-gray-800">
              <p className="mb-4">
                Please read the following policy so you understand how we use the personal information we ask you to submit. 
                As we update and expand our services, this policy mar change, so please refer back to it periodically. 
                If you use our Site (defined below) or any of our many offerings and services (the "Services"), you confirm that you agree to this policy.
              </p>
              
              <p className="mb-6">
                If you have questions or concerns regarding this policy, please contact us or write to us at 
                Innovative Technology Strategies Inc., ATTN: Chief Operating Officer, 2-144 Old Kingston Rd, Ajax ON L1T 2Z9.
              </p>

              <div className="mb-6">
                <p className="font-bold text-gray-900 mb-3">Click on one of the following links to jump directly to that section:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Collection and Use of Information</li>
                  <li>Viewing and Updating Your Information</li>
                  <li>Cookies, Tracking, Interest Based Advertising, and Analytics</li>
                  <li>Cached Information</li>
                  <li>Log Files</li>
                  <li>Links</li>
                  <li>Security and Access</li>
                  <li>Children</li>
                  <li>Notification of Changes</li>
                  <li>Further Questions</li>
                </ul>
              </div>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Collection and Use of Information</h2>
                <p className="text-gray-800 mb-3">
                  When you register with this site or one of the web sites in our network (collectively, the "Innovative Talent Solutions Inc. Network" or the "Site"), 
                  we ask you for personal information, such as your name, phone number, and email address. We use this information to process your requests, 
                  to communicate with you about the status of your requests, and to review and improve the service we provide to you. 
                  At this time, we Mar subscribe you to various email publications. You can unsubscribe from any or all publications at any time. 
                  We Mar also use your email address to send you information about your account, such as newsletters to which you are subscribed during registration, 
                  as well as messages about any special offers, promotional announcements, and consumer surveys, Innovative Technology Strategies Inc. Services, 
                  account updates, services that Mar be of interest to you, or administrative messages regarding your account.
                </p>
                <p className="text-gray-800 mb-3">
                  We Mar also collect information about you automatically through your use of the Site. This information Mar include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>Your activity on the Site, including the date and time of your visit, search terms you used, and content you accessed;</li>
                  <li>Your Internet Protocol (IP) address and general geographic area;</li>
                  <li>Your device identification and browser type; and</li>
                  <li>Information we collect through cookies, pixel tags, and other tracking technologies as described below in this policy.</li>
                </ul>
                <p className="text-gray-800 mb-3">
                  By registering on or using our Site, you consent to the disclosure of your personal information to our partners and affiliates in accordance with 
                  your account settings and this policy. Innovative Talent Solutions Inc. does not rent, sell, or share personal information about you with 
                  non-affiliated companies, except with your express consent or under the following limited circumstances. We disclose information:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>to companies and individuals, we engage to perform services on our behalf;</li>
                  <li>to companies that Mar use your data for career-related purposes and other content that Mar be relevant to you;</li>
                  <li>if legally required to do so;</li>
                  <li>to protect the rights or property of the Innovative Technology Strategies Inc. Network or our affiliated companies, or</li>
                  <li>to protect the personal safety of users or the general public.</li>
                </ul>
                <p className="text-gray-800 mb-3">
                  Additionally, information Mar be passed on to a third party in the event of a transfer of ownership of our company. 
                  In order to serve you better and more efficiently, we Mar also share anonymous aggregated information about users with our partners and other third parties.
                </p>
                <p className="text-gray-800 mb-3">
                  We also offer an affiliate program, where affiliate members direct customers to the Innovative Technology Strategies Inc. Network through links 
                  on their Web sites. We ask affiliates for information, including their site name (URL), mailing address, primary contact, pay-to address, 
                  technical contact, and other site-related information, to determine whether a site will be included in our affiliate program. 
                  The information collected from our affiliates is used strictly for our affiliate program; none of this information is used for general marketing purposes.
                </p>
                <p className="text-gray-800 mb-3">
                  In some cases, our software and Site are utilized by our partners in a business alliance via their web community. 
                  In these cases, the information collected on our Site is available to both companies.
                </p>
                <p className="text-gray-800 mb-3">
                  You should be aware that any personal information (such as email address or resumes), which you voluntarily display or distribute on the 
                  Innovative Technology Strategies Inc. Network and/or on the Internet can be collected and used by others, no different than posting this 
                  information in a newspaper. This Mar result in your receiving unsolicited messages from third parties for which Innovative Technology Strategies Inc. 
                  is not responsible and has no ability to affect. If you click on a third party job posting and provide that party with your personal information, 
                  we have no responsibility or control over that information.
                </p>
                <p className="text-gray-800 mb-3">
                  At this time, we only offer our Services to individuals in Canada and North America.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Viewing and Updating Your Information</h2>
                <p className="text-gray-800 mb-3">
                  You always have complete access to the information you have provided to the Innovative Technology Strategies Inc. Network. 
                  You can make changes to this information to update your account anytime. If you are a registered member, click here to access 
                  your account and manage your email options. We will delete data on our Site that you have provided to us, upon request, 
                  through our Contact Us form.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Cookies, Tracking, Interest Based Advertising, and Analytics</h2>
                <p className="text-gray-800 mb-3">
                  Cookies are small pieces of data that are sent to your browser from a Web server and stored on your hard drive and/or your mobile device. 
                  In general, we use cookies and similar technologies to help us better serve you and improve your experience on our Site. 
                  As you browse areas of the Innovative Technology Strategies Inc. Network and view emails from us, cookies Mar be placed on your computer's 
                  hard drive and/or your mobile device which Mar allow us to collect information, such as your internet protocol address and mobile device identifier. 
                  Cookies allow us to track your account so you don't need to retype the information each time you visit our Site. Cookies also allow us to provide 
                  certain services and features to you. You Mar refuse cookies in your browser, but doing so Mar result in certain services and features not functioning properly. 
                  We use third-party advertising companies to serve ads and/or collect certain information when you visit our Site. These advertisers Mar also serve cookies 
                  when you click on advertisements on the Site, or use pixel tags, web beacons, or similar technologies, including within email advertisements we send on 
                  their behalf, to collect non-personally identifiable aggregated information when users visit the Site in order to provide advertisements on our Site, 
                  other sites, and other forms of media about goods and services that Mar be of interest to you. This common practice is known as "online behavioral advertising" 
                  or "interest based advertising". To learn more about this practice or to opt-out of this use of your information, click here. In addition, if you want 
                  to prevent a third-party advertiser from collecting data, you Mar visit each ad network's web site individually and opt-out. 
                  We do not have access to personal information, if any, gathered by advertisers.
                </p>
                <p className="text-gray-800 mb-3">
                  We also use the third-party analytics service Google Analytics to help analyze how users use our Site. The information generated by cookies or 
                  other tracking technologies about your use of our Site is transmitted to Google Analytics, which uses such non-personally identifiable information 
                  to compile reports on user activity. We Mar connect such information to other data that we have about the user. Google Analytics' ability to use and 
                  share this analytics information is restricted by its terms of use and privacy policy. By using our Site, you consent to Google Analytics using your 
                  data in the manner and for the purposes described above. To learn more about how Google uses data, visit https://policies.google.com/privacy.
                </p>
                <p className="text-gray-800 mb-3">
                  Notwithstanding anything else in this policy, we or a data company we have engaged Mar place or recognize a unique cookie on your browser 
                  (including on your mobile device) to enable you to receive customized ads or content, including through online behavioral advertising. 
                  These cookies contain no personally identifiable information. The cookies Mar reflect de-identified demographic or other data linked to data 
                  you voluntarily have submitted to us, e.g., your email address that we Mar share with a data company solely in hashed, non-human readable form. 
                  To opt-out of these cookies, please click here. Also, a data company, with or without the use of cookies and similar technologies, Mar use personal 
                  information that we have collected or that you have provided online and link this information to IP addresses and/or device identifiers assigned to 
                  you as well as to demographic and other data.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Cached Information</h2>
                <p className="text-gray-800 mb-3">
                  There Mar be instances where information you have submitted to Innovative Technology Strategies Inc. is temporarily cached or stored by another site, 
                  such as Google.com, even after such information has been removed from the Innovative Technology Strategies Inc. Network. These sites are maintained 
                  by third parties not controlled by Innovative Technology Strategies Inc. Accordingly, Innovative Technology Strategies Inc. expressly disclaims any 
                  responsibility for the cached information displayed by these third-party web sites.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Log Files</h2>
                <p className="text-gray-800 mb-3">
                  We use IP addresses to analyze trends, administer the Site, track user's movement, and gather broad demographic information for aggregate use. 
                  IP addresses are not linked to personally identifiable information.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Links</h2>
                <p className="text-gray-800 mb-3">
                  The Innovative Technology Strategies Inc. Network contains links to other sites. You Mar have arrived at this website by clicking on a link from a 
                  Innovative Technology Strategies Inc. affiliate or other affiliate. If so, you should be aware that Innovative Technology Strategies Inc. Mar share 
                  your information with that affiliate and the affiliate Mar use the information in accordance with its privacy policy instead of ours.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Security and Access</h2>
                <p className="text-gray-800 mb-3">
                  We have implemented technology and security features, as well as internal guidelines, designed to safeguard the privacy of your personal information 
                  from unauthorized access or improper use. We will continue to endeavor to enhance our security procedures as new technology becomes available. 
                  However, no data transmission over the Internet can be guaranteed to be 100% secure. As a result, we cannot guarantee the security of any information 
                  you transmit to us, and you do so at your own risk.
                </p>
                <p className="text-gray-800 mb-3">
                  When you place an order online at the Innovative Talent Solutions Inc. Network, your credit card information is protected through the use of encryption, 
                  such as the Secure Socket Layer ("SSL") protocol. SSL makes it difficult for your credit card information to be intercepted or stolen while being transmitted. 
                  This Site uses a service company to process its credit card transactions.
                </p>
                <p className="text-gray-800 mb-3">
                  Users should not post personal information to any site if they are uncomfortable with the security of the site. If you have any questions, please contact us.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Children</h2>
                <p className="text-gray-800 mb-3">
                  This Site is not intended for, directed to, or designed to attract, children under 18 years of age and we do not knowingly or specifically collect 
                  information about children. This Site does not and will not contact children under age 18. We believe that children should get their parents' consent 
                  before giving out personal information. If you are concerned about your child's use of this Site, we encourage you to use web-filtering technology to 
                  supervise your child's access to the Site.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Notification of Changes</h2>
                <p className="text-gray-800 mb-3">
                  If we decide to change our privacy policy, we will post those changes here so our users are always aware of what information we collect, 
                  how we use it, and under what circumstances, if any, we disclose it.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Further Questions</h2>
                <p className="text-gray-800 mb-3">
                  If you need information about Innovative Technology Strategies Inc.'s privacy policy not stated above, use our Contact Us form.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
