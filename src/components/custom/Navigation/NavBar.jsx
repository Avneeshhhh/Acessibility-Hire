"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center justify-center bg-blue-600 w-8 h-8 rounded-full mr-2">
              <Accessibility className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-blue-700">
              Accessibility Hire
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/"
              className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/jobs"
              className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Jobs
            </Link>
            <Link 
              href="/employers"
              className="text-gray-800 hover:text-blue-600 transition-colors font-medium"
            >
              Companies
            </Link>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-5 py-2 h-10 text-sm font-medium ml-2"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-inner">
            <div className="space-y-2">
              <Link 
                href="/"
                className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/jobs"
                className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jobs
              </Link>
              <Link 
                href="/employers"
                className="block py-2 text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Companies
              </Link>
              
              <div className="pt-2 pb-3">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full py-2 h-10 text-sm font-medium"
                  onClick={() => {
                    router.push('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
