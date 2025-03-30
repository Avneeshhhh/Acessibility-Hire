"use client";

import React from 'react';
import { useAuth } from '@/lib/authContext';
import JobBoard from './JobBoard';
import Link from 'next/link';
import { ChevronRight, Lock, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const ClientJobBoardSection = () => {
  const { user } = useAuth();

  // If user is logged in, show the job board
  if (user) {
    return <JobBoard />;
  }

  // If user is not logged in, show login prompt
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
        <div className="max-w-5xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Exclusive Job Opportunities</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Log in to access our personalized job board with exclusive positions from top inclusive employers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="p-8 md:p-10 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-blue-700" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Member-Only Access</h3>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Our job board features exclusive opportunities tailored for professionals with disabilities. 
                Sign in to browse jobs, save favorites, and apply directly to positions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-12 px-6 bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <LogIn className="w-5 h-5" />
                    Log In to View Jobs
                  </motion.button>
                </Link>
                
                <Link href="/signup">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-12 px-6 border border-blue-600 bg-white text-blue-700 hover:bg-blue-50 rounded-lg font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    Sign Up Now
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4">
                    <div className="text-xl font-bold text-blue-700 mb-1">200+</div>
                    <div className="text-sm text-gray-600">Inclusive Employers</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-xl font-bold text-blue-700 mb-1">500+</div>
                    <div className="text-sm text-gray-600">Exclusive Positions</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-xl font-bold text-blue-700 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-6 text-sm text-gray-500">
            Already have an account but can't log in? <Link href="/help" className="text-blue-600 hover:underline">Get help</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientJobBoardSection; 