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
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/80 to-gray-100/60"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70" aria-hidden="true"></div>
        
        {/* Decorative blurs */}
        <motion.div 
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 right-1/3 w-[600px] h-[600px] rounded-full bg-gray-200/20 blur-[150px]" 
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
          className="absolute -bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gray-300/20 blur-[120px]" 
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
          className="absolute top-[40%] left-1/3 w-[350px] h-[350px] rounded-full bg-gray-100/20 blur-[100px]" 
          aria-hidden="true"
        ></motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-[10%] right-[10%] w-20 h-20 rounded-xl border border-gray-200/80 bg-white/30 backdrop-blur-md rotate-12 opacity-60" aria-hidden="true"></div>
        <div className="absolute bottom-[15%] left-[12%] w-16 h-16 rounded-xl border border-gray-200/80 bg-white/30 backdrop-blur-md -rotate-12 opacity-60" aria-hidden="true"></div>
        <div className="absolute top-[25%] left-[15%] w-10 h-10 rounded-lg border border-gray-200/80 bg-white/20 backdrop-blur-md rotate-45 opacity-40" aria-hidden="true"></div>
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
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-gray-900 to-black">Your Bridge</span>
                <span className="block mt-2">to <span className="relative inline-block">
                  <span className="relative z-10">Success</span>
                  <svg className="absolute -bottom-2 -left-2 w-full h-3 text-gray-400/80" style={{ width: "calc(100% + 16px)" }} viewBox="0 0 100 12" preserveAspectRatio="none" aria-hidden="true">
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
                <span className="text-gray-900 font-semibold"> Accessibility Hire </span>
                today and advance your career to the next level.
              </motion.p>
              
              {/* Modern CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-5 mb-10"
              >
                <Link href="/jobs">
                  <motion.button 
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden h-14 px-8 bg-gradient-to-r from-gray-800 to-black text-white text-base font-medium rounded-lg shadow-lg shadow-gray-500/20 hover:shadow-gray-500/40 transition-all duration-300 w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-700 to-gray-900 transition-opacity opacity-0 group-hover:opacity-100 duration-300"></span>
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
                    className="h-14 px-8 border-2 border-gray-800/80 bg-white/80 backdrop-blur-sm text-gray-900 hover:bg-gray-50/80 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Briefcase className="w-5 h-5" aria-hidden="true" />
                    For Employers
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust indicators strip */}
              {/* <motion.div
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
              </motion.div> */}
            </div>
            
            {/* Right content area */}
            <div className="md:col-span-5 lg:col-span-6 xl:col-span-6">
              <motion.div
                variants={itemVariants}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full max-w-xl mx-auto">
                  <Image 
                    src="/images/herosection.jpg" 
                    alt="Accessibility Hire - Professional Connection"
                    width={700} 
                    height={600}
                    className="rounded-2xl shadow-2xl object-cover"
                    priority
                  />
                  <div className="absolute inset-0 rounded-2xl border border-white/20 shadow-lg"></div>
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
