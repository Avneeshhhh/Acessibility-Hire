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
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)] pointer-events-none"></div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Brand Column */}
          <div className="space-y-3">
            <span className="inline-block">
              <span className="text-xl font-bold text-[#4169E1]">
                Accessibility Hire
              </span>
            </span>
            <p className="text-gray-600 text-sm max-w-xs">
              Your bridge to success, connecting talented professionals with inclusive employers committed to disability inclusion.
            </p>
            <div className="flex space-x-3">
              {/* Social Icons */}
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-1.5 bg-white rounded-full shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-1.5 bg-white rounded-full shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-1.5 bg-white rounded-full shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-1.5 bg-white rounded-full shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-base">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Browse Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Job Alerts</span>
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Company Search</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Career Advice</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-base">For Recruiters</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Post Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Companies</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-1.5 text-sm group">
                  <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company and Newsletter */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-3 text-base">Stay Connected</h3>
            <p className="text-gray-600 mb-2 text-sm">
              Subscribe to our newsletter for the latest updates and job listings.
            </p>
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-gray-800 bg-white shadow-sm text-sm"
              />
              <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <button
                type="submit"
                className="mt-2 w-full px-3 py-2 bg-[#4169E1] text-white rounded-lg hover:bg-[#3050C0] transition-colors font-medium shadow-sm text-sm"
              >
                Subscribe
              </button>
            </div>
            
            <h3 className="text-gray-800 font-semibold mb-2 text-base">Company</h3>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#4169E1] transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#4169E1] transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-2 md:mb-0 text-xs">
              © {currentYear} Accessibility Hire. All Rights Reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-[#4169E1] transition-colors text-xs">Privacy Policy</Link>
              <Link href="/termsNcondition" className="text-gray-600 hover:text-[#4169E1] transition-colors text-xs">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
