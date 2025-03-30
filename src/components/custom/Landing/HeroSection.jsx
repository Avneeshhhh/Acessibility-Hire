"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Building, Sparkles, Briefcase, ChevronRight, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const router = useRouter();
  const heroRef = useRef(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.4 },
    animate: {
      opacity: [0.4, 0.6, 0.4],
      transition: {
        duration: 3.5,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-[95vh] w-full flex items-center overflow-hidden py-10 md:py-16 mt-16">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base color */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-blue-50/60"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70" aria-hidden="true"></div>
        
        {/* Decorative blurs */}
        <motion.div 
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 right-1/3 w-[600px] h-[600px] rounded-full bg-blue-300/20 blur-[150px]" 
          aria-hidden="true"
        ></motion.div>
        <motion.div 
          variants={{
            ...glowVariants,
            animate: {
              opacity: [0.3, 0.5, 0.3],
              transition: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1
              }
            }
          }}
          initial="initial"
          animate="animate"
          className="absolute -bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-200/20 blur-[120px]" 
          aria-hidden="true"
        ></motion.div>
        <motion.div 
          variants={{
            ...glowVariants,
            animate: {
              opacity: [0.3, 0.6, 0.3],
              transition: {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5
              }
            }
          }}
          initial="initial"
          animate="animate"
          className="absolute top-[40%] left-1/3 w-[350px] h-[350px] rounded-full bg-teal-200/20 blur-[100px]" 
          aria-hidden="true"
        ></motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-[10%] right-[10%] w-20 h-20 rounded-xl border border-blue-200/80 bg-white/30 backdrop-blur-md rotate-12 opacity-60" aria-hidden="true"></div>
        <div className="absolute bottom-[15%] left-[12%] w-16 h-16 rounded-xl border border-purple-200/80 bg-white/30 backdrop-blur-md -rotate-12 opacity-60" aria-hidden="true"></div>
        <div className="absolute top-[25%] left-[15%] w-10 h-10 rounded-lg border border-teal-200/80 bg-white/20 backdrop-blur-md rotate-45 opacity-40" aria-hidden="true"></div>
      </div>
      
      {/* Main content container */}
      <div className="container-fluid relative z-10 mx-auto px-4 sm:px-5 md:px-6 lg:px-10 xl:px-14 2xl:px-16 max-w-[1920px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y, opacity }}
          className="max-w-full mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 xl:gap-20">
            {/* Left content area */}
            <div className="md:col-span-7 lg:col-span-6 xl:col-span-6 xl:pl-8 2xl:pl-16 pt-6 md:pt-12">
              {/* Branded badge */}
           
              
              {/* Primary headline */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-7 text-gray-900"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900">Your Bridge</span>
                <span className="block mt-2">to <span className="relative inline-block">
                  <span className="relative z-10">Success</span>
                  <svg className="absolute -bottom-2 -left-2 w-full h-3 text-blue-400/80" style={{ width: "calc(100% + 16px)" }} viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span></span>
              </motion.h1>
              
              {/* Secondary headline */}
              <motion.h2
                variants={itemVariants}
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-7 max-w-2xl"
              >
                Connecting talent with inclusive employers who value diversity
              </motion.h2>
              
              {/* Description with accent */}
              <motion.p 
                variants={itemVariants}
                className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl"
              >
                Explore an extensive selection of job opportunities specifically 
                designed for professionals with disabilities. Become a member of 
                <span className="text-blue-700 font-semibold"> Accessibility Hire </span>
                today and advance your career to the next level.
              </motion.p>
              
              {/* Modern CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-5 mb-10"
              >
                <Link href="/jobs">
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base font-medium rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-opacity opacity-0 group-hover:opacity-100 duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Find Your Job
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </span>
                  </motion.button>
                </Link>
                
                <Link href="/employers">
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="h-14 px-8 border-2 border-blue-600/80 bg-white/80 backdrop-blur-sm text-blue-700 hover:bg-blue-50/80 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Briefcase className="w-5 h-5" aria-hidden="true" />
                    For Employers
                  </motion.button>
                </Link>
              </motion.div>
              
              {/* Trust indicators strip */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-3 md:gap-6 text-sm text-gray-500"
              >
                <span className="font-medium">Trusted by:</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
                  <span>5,000+ Professionals</span>
                </div>
                <div className="h-4 w-px bg-gray-300 mx-1"></div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
                  <span>200+ Employers</span>
                </div>
              </motion.div>
            </div>
            
            {/* Right content area */}
            <div className="md:col-span-5 lg:col-span-6 xl:col-span-6">
              {/* Modern glass card */}
              <motion.div
                variants={itemVariants}
                className="bg-white/60 backdrop-blur-lg mt-12 rounded-2xl p-6 md:p-8 border border-white/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] w-full max-w-xl mx-auto"
              >
                <div className="relative">
                  {/* Card header with accent */}
                  <div className="absolute -top-10 -left-3 md:-left-4 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg shadow-blue-500/20 text-white font-medium text-sm">
                    Why Choose Us?
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="space-y-5 mb-7 mt-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 bg-green-50 rounded-full shadow-sm border border-green-100" aria-hidden="true">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">Verified Employers</h4>
                        <p className="text-xs text-gray-600">All employers are committed to diversity and inclusion</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 bg-green-50 rounded-full shadow-sm border border-green-100" aria-hidden="true">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">Tailored Experience</h4>
                        <p className="text-xs text-gray-600">Inclusive environment with accessibility-focused opportunities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 bg-green-50 rounded-full shadow-sm border border-green-100" aria-hidden="true">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-0.5 text-sm">Smart Matching</h4>
                        <p className="text-xs text-gray-600">Personalized recommendations based on skills and preferences</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative overflow-hidden p-4 rounded-xl">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-blue-500/15 backdrop-blur-sm border border-blue-200/60 rounded-xl"></div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center gap-2">
                        <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full border border-blue-200 shadow-sm">
                          <Users className="w-5 h-5 text-blue-700" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-blue-900 font-semibold text-lg mb-0.5">5,000+</div>
                          <div className="text-blue-800 text-xs">Professionals</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative overflow-hidden p-4 rounded-xl">
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-purple-500/15 backdrop-blur-sm border border-purple-200/60 rounded-xl"></div>
                      
                      <div className="relative z-10 flex flex-col items-center text-center gap-2">
                        <div className="h-10 w-10 flex items-center justify-center bg-purple-100 rounded-full border border-purple-200 shadow-sm">
                          <Building className="w-5 h-5 text-purple-700" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-purple-900 font-semibold text-lg mb-0.5">200+</div>
                          <div className="text-purple-800 text-xs">Employers</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA button */}
                  <Link href="/register" className="block mt-6">
                    <motion.button 
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-10 px-5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white text-sm font-medium rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Join Our Network
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </motion.button>
                  </Link>
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
