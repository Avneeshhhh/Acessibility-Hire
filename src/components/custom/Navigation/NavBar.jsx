"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Accessibility, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-[100] bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center h-16 px-4">
          {/* Three-column layout: Logo | Navigation | Actions */}
          <div className="flex-1 flex items-center justify-start">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center" aria-label="Accessibility Hire Home">
              {/* <div className="flex items-center justify-center bg-blue-700 w-9 h-9 rounded-full mr-2.5">
                <Accessibility className="w-5 h-5 text-white" aria-hidden="true" />
              </div> */}
              <span className="text-2xl font-bold text-grey-800">
                Accessibility Hire
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
              <Link 
                href="/"
                className="text-gray-700 hover:text-blue-700 transition-colors font-medium px-5 py-2 rounded-full hover:bg-white hover:shadow-sm"
              >
                Home
              </Link>
              <Link 
                href="/jobs"
                className="text-gray-700 hover:text-blue-700 transition-colors font-medium px-5 py-2 rounded-full hover:bg-white hover:shadow-sm"
              >
                Jobs
              </Link>
              <Link 
                href="/employers"
                className="text-gray-700 hover:text-blue-700 transition-colors font-medium px-5 py-2 rounded-full hover:bg-white hover:shadow-sm"
              >
                Companies
              </Link>
            </div>
          </nav>

          {/* Login/Signup or User Profile - Right aligned */}
          <div className="flex-1 flex items-center justify-end">
            {user ? (
              <div 
                onClick={handleProfile}
                className="cursor-pointer flex items-center"
                tabIndex="0"
                role="button"
                aria-label="Profile"
              >
                <div className="h-10 w-10 rounded-full overflow-hidden relative border-2 border-blue-600 hover:border-blue-700 transition-colors shadow-sm">
                  {user.photoURL ? (
                    <Image 
                      src={user.photoURL}
                      alt={user.displayName || "Profile"}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 40px"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  className="bg-blue-700 hover:bg-blue-800 text-white rounded-md px-5 py-2 h-10 text-sm font-medium"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button 
                  className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 rounded-md px-5 py-2 h-10 text-sm font-medium"
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center ml-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav 
            className="md:hidden bg-white py-5 px-6 shadow-lg border-t border-gray-100 rounded-b-xl"
            aria-label="Mobile Navigation"
          >
            <div className="space-y-3">
              <Link 
                href="/"
                className="flex items-center py-3 px-4 text-gray-800 hover:text-blue-700 font-medium bg-white rounded-lg hover:bg-gray-50 border border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mx-auto">Home</span>
              </Link>
              <Link 
                href="/jobs"
                className="flex items-center py-3 px-4 text-gray-800 hover:text-blue-700 font-medium bg-white rounded-lg hover:bg-gray-50 border border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mx-auto">Jobs</span>
              </Link>
              <Link 
                href="/employers"
                className="flex items-center py-3 px-4 text-gray-800 hover:text-blue-700 font-medium bg-white rounded-lg hover:bg-gray-50 border border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mx-auto">Companies</span>
              </Link>
              
              {!user && (
                <div className="grid grid-cols-1 gap-3 pt-5">
                  <Button 
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded-lg w-full py-3 h-12 text-sm font-medium shadow-sm transition-all duration-200"
                    onClick={() => {
                      router.push('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 rounded-lg w-full py-3 h-12 text-sm font-medium shadow-sm transition-all duration-200"
                    onClick={() => {
                      router.push('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
            
            {/* Divider and additional info */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs text-gray-500">Looking for talent? <Link href="/employers" className="text-blue-700 font-medium">Post a Job</Link></p>
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default NavBar;
