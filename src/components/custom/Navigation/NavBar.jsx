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
  const [jobsMenuOpen, setJobsMenuOpen] = useState(false);
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
    setJobsMenuOpen(false);
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

  // Memoize dropdown menu to prevent re-renders
  const DesktopJobsDropdown = useMemo(() => {
    if (!jobsMenuOpen) return null;
    
    return (
      <div className="absolute top-full left-0 mt-2 w-[280px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
        <div className="p-4">
          {/* Categories */}
          <div className="pb-3">
            <div className="font-semibold text-sm text-gray-900 mb-2 flex items-center">
              <Filter className="w-4 h-4 mr-2 text-gray-700" />
              Browse By Category
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Link 
                href="/jobs" 
                className="flex flex-col items-center justify-center p-3 rounded-xl text-sm text-gray-700 bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-300 hover:from-gray-100 hover:to-gray-50/50 hover:text-gray-900 transition-all duration-300 group shadow-sm"
              >
                <Briefcase className="w-5 h-5 mb-1.5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span>All Jobs</span>
              </Link>
              <Link 
                href="/jobs?type=remote" 
                className="flex flex-col items-center justify-center p-3 rounded-xl text-sm text-gray-700 bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-300 hover:from-gray-100 hover:to-gray-50/50 hover:text-gray-900 transition-all duration-300 group shadow-sm"
              >
                <MapPin className="w-5 h-5 mb-1.5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                <span>Remote</span>
              </Link>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="pt-3 border-t border-gray-100">
            <div className="font-semibold text-sm text-gray-900 mb-2">Quick Links</div>
            <div className="space-y-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, [jobsMenuOpen]);

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" suppressHydrationWarning>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo and Brand - Left aligned */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="Accessibility Hire Home">
              <span className="text-2xl font-bold text-grey-800">
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
                
                <div className="relative">
                  <button
                    onClick={() => setJobsMenuOpen(!jobsMenuOpen)}
                    className={`text-gray-700 hover:text-gray-900 transition-colors font-medium px-5 py-2 rounded-full flex items-center gap-1 ${
                      isActive('/jobs') || jobsMenuOpen ? 'bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm text-gray-900' : 'hover:bg-white/80 hover:shadow-sm'
                    }`}
                    aria-expanded={jobsMenuOpen}
                    aria-haspopup="true"
                  >
                    <Briefcase className="w-4 h-4 mr-1" />
                    Jobs
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${jobsMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {DesktopJobsDropdown}
                </div>
                
                <NavLink href="/employers" isActive={isActive('/employers')}>
                  For Employers
                </NavLink>
              </div>
            </nav>
          )}

          {/* Login/Signup or User Profile - Right aligned */}
          <div className="flex items-center">
            {isClient && (
              <>
                {user ? (
                  <div className="flex items-center gap-3">
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
                  <div className="flex items-center space-x-3">
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
            <div className="md:hidden flex items-center ml-4">
              {isClient && (
                <motion.button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-sm"
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
                    <button
                      onClick={() => setJobsMenuOpen(!jobsMenuOpen)}
                      className={`flex items-center justify-between w-full py-3 px-4 font-medium rounded-lg border border-gray-100 ${
                        isActive('/jobs') || jobsMenuOpen ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-800 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      aria-expanded={jobsMenuOpen}
                      aria-controls="mobile-jobs-menu"
                    >
                      <span className="mx-auto flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Jobs
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${jobsMenuOpen ? 'rotate-180' : ''}`} />
                      </span>
                    </button>
                    
                    <AnimatePresence>
                      {jobsMenuOpen && (
                        <motion.div 
                          id="mobile-jobs-menu"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 bg-gray-50/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-inner border border-gray-100"
                        >
                          <div className="p-4 space-y-4">
                            {/* Search Input */}
                            <div className="space-y-2">
                              <div className="font-medium text-sm text-gray-800 flex items-center">
                                <Search className="w-4 h-4 mr-2 text-gray-600" />
                                Find Jobs
                              </div>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <Search className="h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                                </div>
                                <input 
                                  type="text" 
                                  placeholder="Search jobs..." 
                                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent shadow-sm"
                                  aria-label="Search jobs"
                                />
                              </div>
                            </div>

                            {/* Categories Grid */}
                            <div className="space-y-2">
                              <div className="font-medium text-sm text-gray-800 flex items-center">
                                <Filter className="w-4 h-4 mr-2 text-gray-600" />
                                Job Categories
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {/* Job Category Links */}
                                {[
                                  { 
                                    href: "/jobs", 
                                    icon: <Briefcase className="w-5 h-5 mb-1 text-gray-500 group-hover:text-gray-700 transition-colors" />,
                                    label: "All Jobs" 
                                  },
                                  { 
                                    href: "/jobs?type=remote", 
                                    icon: <MapPin className="w-5 h-5 mb-1 text-gray-500 group-hover:text-gray-700 transition-colors" />,
                                    label: "Remote" 
                                  },
                                  { 
                                    href: "/jobs?category=tech",
                                    icon: <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-gray-700 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 18.5C12 19.3284 11.3284 20 10.5 20H6.5C5.67157 20 5 19.3284 5 18.5V13.5C5 12.6716 5.67157 12 6.5 12H10.5C11.3284 12 12 12.6716 12 13.5V18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M19 18.5C19 19.3284 18.3284 20 17.5 20H13.5C12.6716 20 12 19.3284 12 18.5V13.5C12 12.6716 12.6716 12 13.5 12H17.5C18.3284 12 19 12.6716 19 13.5V18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M15.5 12V8.5C15.5 5.46243 13.0376 3 10 3C6.96243 3 4.5 5.46243 4.5 8.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>,
                                    label: "Tech" 
                                  },
                                  { 
                                    href: "/jobs?category=design",
                                    icon: <svg className="w-5 h-5 mb-1 text-gray-500 group-hover:text-gray-700 transition-colors" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12 6.5C12 5.11929 13.1193 4 14.5 4C15.8807 4 17 5.11929 17 6.5C17 7.88071 15.8807 9 14.5 9C13.1193 9 12 7.88071 12 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M7 12.5C7 11.1193 8.11929 10 9.5 10C10.8807 10 12 11.1193 12 12.5C12 13.8807 10.8807 15 9.5 15C8.11929 15 7 13.8807 7 12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M12 18.5C12 17.1193 13.1193 16 14.5 16C15.8807 16 17 17.1193 17 18.5C17 19.8807 15.8807 21 14.5 21C13.1193 21 12 19.8807 12 18.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      <path d="M12 12.5H14.5M9.5 15V16M14.5 9V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>,
                                    label: "Design" 
                                  }
                                ].map((category, index) => (
                                  <Link 
                                    key={index}
                                    href={category.href} 
                                    className="flex flex-col items-center justify-center p-3 rounded-xl text-sm text-gray-700 bg-white border border-gray-100 hover:border-gray-300 hover:bg-gray-50/50 hover:text-gray-900 transition-all duration-300 group shadow-sm"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {category.icon}
                                    <span>{category.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            {/* Personalized Section */}
                            {user ? (
                              <div className="space-y-2">
                                <Link 
                                  href="/profile?tab=jobs" 
                                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                                    <Briefcase className="w-4 h-4 text-gray-700" />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-medium">Recommended Jobs</span>
                                    <div className="text-xs text-gray-700/80">Personalized for you</div>
                                  </div>
                                </Link>
                                <Link 
                                  href="/profile?tab=saved" 
                                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-white text-gray-700 border border-gray-100 shadow-sm"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-medium">Saved Jobs</span>
                                    <div className="text-xs text-gray-500">Your bookmarks</div>
                                  </div>
                                </Link>
                              </div>
                            ) : (
                              <div className="p-4 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200/60">
                                <div className="text-sm font-medium text-gray-800 mb-1.5">Get Personalized Jobs</div>
                                <p className="text-xs text-gray-600 mb-3">Sign in to see jobs matching your skills and experience</p>
                                <button 
                                  onClick={handleLogin}
                                  className="w-full py-2 bg-gradient-to-r from-gray-800 to-black text-white text-sm font-medium rounded-lg shadow-sm flex items-center justify-center"
                                  aria-label="Log In"
                                >
                                  <LogIn className="w-4 h-4 mr-2" />
                                  Log In Now
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <Link 
                    href="/employers"
                    className={`flex items-center py-3 px-4 font-medium rounded-lg border border-gray-100 ${
                      isActive('/employers') ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-800 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mx-auto">Companies</span>
                  </Link>
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
