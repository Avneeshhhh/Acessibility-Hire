"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)] pointer-events-none" aria-hidden="true"></div>

      <div className="relative container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="inline-block">
              <span className="text-xl font-bold text-gray-800">
                Accessibility Hire
              </span>
            </span>
            <p className="text-gray-700 text-sm max-w-xs">
              Your bridge to success, connecting talented professionals with inclusive employers committed to disability inclusion.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors p-2 bg-white rounded-full shadow-sm" aria-label="Facebook">
                <Facebook className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors p-2 bg-white rounded-full shadow-sm" aria-label="Twitter">
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors p-2 bg-white rounded-full shadow-sm" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors p-2 bg-white rounded-full shadow-sm" aria-label="Instagram">
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="mt-8 sm:mt-0">
            <h3 className="text-gray-900 font-semibold mb-4 text-base">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/jobs" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Browse Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Job Alerts</span>
                </Link>
              </li>
              <li>
                <Link href='/' className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Company Search</span>
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Career Advice</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Combined For Recruiters & Company */}
          <div className="mt-8 sm:mt-0">
            <div>
              <h3 className="text-gray-900 font-semibold mb-4 text-base">For Recruiters</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/profile" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                    <span>Post Jobs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                    <span>Companies</span>
                    
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                    <span>Pricing</span>
                    
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company Links */}
            <div className="mt-8">
              <h3 className="text-gray-900 font-semibold mb-4 text-base">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-8 lg:mt-0">
            <h3 className="text-gray-900 font-semibold mb-4 text-base">Stay Connected</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and job listings.
            </p>
            <div className="relative mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 text-gray-800 bg-white shadow-sm text-sm"
              />
              <button 
                type="submit" 
                className="mt-3 w-full py-2.5 px-5 bg-gray-900 hover:bg-black text-white text-sm font-medium rounded-lg flex items-center justify-center shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Subscribe 
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-blue-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {currentYear} Accessibility Hire. All Rights Reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy-policy" className="text-gray-700 hover:text-blue-700 transition-colors text-sm focus:outline-none focus:text-blue-700">
                Privacy Policy
              </Link>
              <Link href="/termsNcondition" className="text-gray-700 hover:text-blue-700 transition-colors text-sm focus:outline-none focus:text-blue-700">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
