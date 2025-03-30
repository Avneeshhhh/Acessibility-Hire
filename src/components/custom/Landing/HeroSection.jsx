"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, Building, Sparkles, Briefcase, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  const router = useRouter();
  
  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-blue-50/50 py-10 md:py-16 mt-8 md:mt-12">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]"></div>
        
        {/* Simplified gradient background */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-[80px] opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-200/20 blur-[80px] opacity-40"></div>
      </div>
      
      {/* Main content container with side padding */}
      <div className="container relative z-10 mx-auto px-5 md:px-10 xl:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto md:ml-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            {/* Left content area - spans 8 columns on desktop */}
            <div className="md:col-span-8">
              {/* Badge */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold bg-blue-50 text-blue-700 rounded-full shadow-sm border border-blue-100"
              >
                <Sparkles className="w-4 h-4" />
                <span>Empowering Careers, Connecting Talent</span>
              </motion.div>
              
              {/* Headline */}
              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.2] mb-6 text-blue-800"
              >
                <span>YOUR BRIDGE</span>
                <br />
                <span>TO SUCCESS</span>
                <br />
                <span className="text-gray-900 mt-3 block">
                  CONNECTING
                  <br />TALENT, IGNITING
                  <span className="relative">
                    <span className="relative z-10">OPPORTUNITIES</span>
                    <svg className="absolute -bottom-2 -left-1 w-full h-3 text-purple-200" style={{ width: "calc(100% + 8px)" }} viewBox="0 0 100 12" preserveAspectRatio="none">
                      <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8"
              >
                Explore an extensive selection of job opportunities specifically 
                designed for professionals with disabilities. Become a member of 
                Accessibility Hire today and advance your career to the next level.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link href="/jobs">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden h-12 px-6 bg-blue-600 text-white text-base font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Find Jobs
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
                
                <Link href="/employers">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-12 px-6 border border-blue-600 bg-white text-blue-600 hover:bg-blue-50 text-base font-medium rounded-md shadow-sm transition-all duration-200 hover:shadow flex items-center gap-2"
                  >
                    <Briefcase className="w-5 h-5" />
                    Post Jobs
                  </motion.button>
                </Link>
              </motion.div>
            </div>
            
            {/* Right content area - spans 4 columns on desktop */}
            <div className="md:col-span-4">
              {/* Trust indicators card */}
              <motion.div
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-base font-semibold text-gray-800 mb-4">Why choose Accessibility Hire?</h3>
                
                {/* Trust Indicators */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">Verified employers committed to diversity and inclusion</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">Inclusive environment with accessibility-focused opportunities</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">Personalized recommendations based on your skills and preferences</span>
                  </div>
                </div>
                
                {/* Stats badges */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md border border-blue-100">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">5,000+ Professionals</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-md border border-purple-100">
                    <Building className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">200+ Inclusive Employers</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
