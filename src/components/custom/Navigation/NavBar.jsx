"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Accessibility, User, Briefcase, Search, ChevronDown, Bell, Filter, MapPin, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { motion, AnimatePresence } from 'framer-motion';

// Quick links array for the dropdown menu
const quickLinks = [
  { 
    label: "Recent Jobs", 
    href: "/jobs?sort=recent", 
    icon: ({ className }) => <Briefcase className={className} /> 
  },
  { 
    label: "Remote Positions", 
    href: "/jobs?type=remote", 
    icon: ({ className }) => <MapPin className={className} /> 
  },
  { 
    label: "Accessibility Features", 
    href: "/jobs?features=accessible", 
    icon: ({ className }) => <Accessibility className={className} /> 
  }
];

// Memoized Navigation Link Component
const NavLink = React.memo(({ href, isActive, children, onClick }) => (
  <Link 
    href={href}
    className={`text-gray-700 hover:text-gray-900 transition-colors font-medium px-5 py-2 rounded-full ${
      isActive ? 'bg-white shadow-sm text-gray-900' : 'hover:bg-white/80 hover:shadow-sm'
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
));

NavLink.displayName = 'NavLink';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Ensure component only renders fully on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogin = useCallback(() => {
    router.push('/login');
    setMobileMenuOpen(false);
  }, [router]);

  const handleSignup = useCallback(() => {
    router.push('/signup');
    setMobileMenuOpen(false);
  }, [router]);

  const handleProfile = useCallback(() => {
    router.push('/profile');
  }, [router]);

  const isActive = useCallback((path) => {
    return pathname === path;
  }, [pathname]);

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" suppressHydrationWarning>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo and Brand - Left aligned */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Accessibility Hire Home">
              <span className="text-xl md:text-2xl font-bold text-grey-800">
                Accessibility Hire
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          {isClient && (
            <nav className="hidden md:flex items-center">
              <div className="flex items-center bg-gray-50/80 rounded-full px-2 py-1 border border-gray-100/80 shadow-sm">
                <NavLink href="/" isActive={isActive('/')}>
                  Home
                </NavLink>
                
                <NavLink href="/jobs" isActive={isActive('/jobs')}>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Jobs
                  </div>
                </NavLink>
                
                {/* <NavLink href="/employers" isActive={isActive('/employers')}>
                  For Employers
                </NavLink> */}
              </div>
            </nav>
          )}

          {/* Login/Signup or User Profile - Right aligned */}
          <div className="flex items-center gap-2">
            {isClient && (
              <>
                {user ? (
                  <div className="hidden md:flex items-center gap-3">
                    {/* Notifications */}
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      aria-label="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-gray-900 rounded-full" aria-hidden="true"></span>
                    </motion.button>
                    
                    {/* Profile Button */}
                    <motion.div 
                      onClick={handleProfile}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer flex items-center"
                      tabIndex="0"
                      role="button"
                      aria-label="Profile"
                    >
                      <div className="h-10 w-10 rounded-full overflow-hidden relative border-2 border-gray-800 hover:border-black transition-colors shadow-sm">
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-800" aria-hidden="true" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-900 hover:bg-black text-white rounded-lg px-5 py-2 h-10 text-sm font-medium shadow-sm"
                      onClick={handleLogin}
                      aria-label="Login"
                    >
                      Login
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white border border-gray-900 text-gray-900 hover:bg-gray-50 rounded-lg px-5 py-2 h-10 text-sm font-medium shadow-sm"
                      onClick={handleSignup}
                      aria-label="Sign Up"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              {isClient && (
                <motion.button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm ml-2"
                  aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isClient && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.nav 
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden bg-white/95 backdrop-blur-md py-5 px-6 shadow-lg border-t border-gray-100 rounded-b-xl"
                aria-label="Mobile Navigation"
              >
                <div className="space-y-3">
                  <Link 
                    href="/"
                    className={`flex items-center py-3 px-4 font-medium rounded-lg border border-gray-100 ${
                      isActive('/') ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-800 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mx-auto">Home</span>
                  </Link>
                  
                  <div className="relative">
                    <Link 
                      href="/jobs"
                      className={`flex items-center justify-between w-full py-3 px-4 font-medium rounded-lg border border-gray-100 ${
                        isActive('/jobs') ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-800 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="mx-auto flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Jobs
                      </span>
                    </Link>
                  </div>
                </div>
                
                {!user && (
                  <div className="grid grid-cols-1 gap-3 pt-5">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gray-900 hover:bg-black text-white rounded-lg w-full py-3 h-12 text-sm font-medium shadow-sm transition-all duration-200"
                      onClick={handleLogin}
                      aria-label="Log In"
                    >
                      Login
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border border-gray-900 text-gray-900 hover:bg-gray-50 rounded-lg w-full py-3 h-12 text-sm font-medium shadow-sm transition-all duration-200"
                      onClick={handleSignup}
                      aria-label="Sign Up"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                )}
              </motion.nav>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default React.memo(NavBar);
