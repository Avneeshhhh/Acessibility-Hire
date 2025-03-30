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

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {/* Brand Column */}
          <div className="space-y-6">
            <span className="inline-block">
              <span className="text-2xl font-bold text-[#4169E1]">
                Accessibility Hire
              </span>
            </span>
            <p className="text-gray-600 text-base max-w-xs">
              Your bridge to success, connecting talented professionals with inclusive employers committed to disability inclusion.
            </p>
            <div className="flex space-x-5">
              {/* Social Icons */}
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-2 bg-white rounded-full shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-2 bg-white rounded-full shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-2 bg-white rounded-full shadow-sm">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#4169E1] transition-colors p-2 bg-white rounded-full shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-6 text-lg">For Job Seekers</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Browse Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Job Alerts</span>
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Company Search</span>
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Career Advice</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-6 text-lg">For Recruiters</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Post Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Companies</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-[#4169E1] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#4169E1] transition-colors"></span>
                  <span>Pricing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company and Newsletter */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-6 text-lg">Stay Connected</h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for the latest updates, job listings, and career resources.
            </p>
            <div className="relative mb-8">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4169E1] text-gray-800 bg-white shadow-sm"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              <button
                type="submit"
                className="mt-3 w-full px-4 py-3 bg-[#4169E1] text-white rounded-lg hover:bg-[#3050C0] transition-colors font-medium shadow-sm"
              >
                Subscribe
              </button>
            </div>
            
            <h3 className="text-gray-800 font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#4169E1] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#4169E1] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-100">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {currentYear} Accessibility Hire. All Rights Reserved.
            </p>
            <div className="flex space-x-8">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-[#4169E1] transition-colors">Privacy Policy</Link>
              <Link href="/termsNcondition" className="text-gray-600 hover:text-[#4169E1] transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
