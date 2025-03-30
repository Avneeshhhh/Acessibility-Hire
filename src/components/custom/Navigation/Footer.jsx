"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-blue-50 border-t border-blue-100">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)] pointer-events-none" aria-hidden="true"></div>

      <div className="relative container mx-auto px-5 py-12 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <span className="inline-block">
              <span className="text-xl font-bold text-blue-800">
                Accessibility Hire
              </span>
            </span>
            <p className="text-gray-700 text-sm max-w-xs">
              Your bridge to success, connecting talented professionals with inclusive employers committed to disability inclusion.
            </p>
            <div className="flex space-x-3">
              {/* Social Icons */}
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
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-base">For Job Seekers</h3>
            <ul className="space-y-2.5">
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
                <Link href="/employers" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Company Search</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Career Advice</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-base">For Recruiters</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/employers" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Post Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Companies</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-1.5 text-sm group focus:outline-none focus:text-blue-700">
                  <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-blue-700 transition-colors"></span>
                  <span>Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company and Newsletter */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4 text-base">Stay Connected</h3>
            <p className="text-gray-700 mb-3 text-sm">
              Subscribe to our newsletter for the latest updates and job listings.
            </p>
            <form className="mb-5">
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <div className="relative mb-2">
                <input
                  id="email-input"
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2.5 pl-9 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800 bg-white shadow-sm text-sm"
                  aria-required="true"
                />
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" aria-hidden="true" />
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2.5 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </form>
            
            <h3 className="text-gray-900 font-semibold mb-3 text-base">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-700 hover:text-blue-700 transition-colors text-sm focus:outline-none focus:text-blue-700">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-blue-700 transition-colors text-sm focus:outline-none focus:text-blue-700">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-blue-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-sm">
              © {currentYear} Accessibility Hire. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
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
