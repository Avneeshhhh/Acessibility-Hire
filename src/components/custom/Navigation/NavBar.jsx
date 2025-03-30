"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, ChevronDown, Users } from 'lucide-react';
import throttle from 'lodash/throttle';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollPos = window.scrollY;
      
      // Determine scroll direction and visibility
      setVisible(true); // Always visible for sticky behavior
      setPrevScrollPos(currentScrollPos);

      // Handle background change
      setScrolled(currentScrollPos > 100);
    }, 150);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // Smooth scroll handler
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    
    // Close mobile menu first
    setMobileMenuOpen(false);
    
    // Check if we're on the /try page
    const isOnTryPage = window.location.pathname === '/try';
    
    if (isOnTryPage) {
      // Navigate to home page with hash
      window.location.href = `/#${targetId}`;
      return;
    }
    
    // If on home page, scroll to section
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100; // Increased offset to prevent overlap
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 300);
  };

  return (
    <div className={`w-full flex justify-center fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 pt-5 transition-all duration-300 ${
      visible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`max-w-[83rem] w-full transition-all duration-500 ${
          scrolled 
            ? 'bg-transparent' 
            : 'bg-transparent'
        }`}
      >
        <div className="px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300">
                  Accessibility Hire
                </span>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                  className="absolute h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 bottom-0 left-0 -mb-1 opacity-70"
                ></motion.div>
              </div>
              <div className="ml-2 hidden md:flex">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-7">
              <Link 
                href="/"
                className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
              >
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link 
                href="/jobs"
                className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
              >
                <span>Jobs</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link 
                href="/employers"
                className="relative text-gray-700 hover:text-blue-600 transition-colors font-medium group"
              >
                <span>Companies</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>

              <div className="flex space-x-3 ml-2">
                <Button 
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 h-10 shadow-md transition-all duration-300 font-medium group"
                  onClick={() => window.open('/employers', '_self')}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Login
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-blue-600" />
              ) : (
                <Menu className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-2 bg-white/90 backdrop-blur-md rounded-xl shadow-lg"
              >
                <div className="py-4 space-y-4">
                  <Link 
                    href="/"
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/jobs"
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                  <Link 
                    href="/employers"
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Companies
                  </Link>
                  <a 
                    href="#about"
                    onClick={(e) => handleNavClick(e, 'about')}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors font-medium"
                  >
                    About
                  </a>
                  <div className="px-4 pt-2 space-y-3">
                    <Button 
                      className="w-full group relative overflow-hidden border-blue-500 border text-blue-600 bg-white hover:text-white rounded-xl h-11 transition-all duration-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.open('/jobs', '_self');
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Find Jobs
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                    </Button>
                    <Button 
                      className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl h-11 shadow-md transition-all duration-300"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        window.open('/employers', '_self');
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Post Jobs
                        <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};

export default NavBar;
