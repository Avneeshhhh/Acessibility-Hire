"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Building, Sparkles, Briefcase, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 md:py-20 overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white_40%,transparent_80%)]"></div>
        
        {/* Gradient orbs */}
        <div 
          className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[100px] opacity-60"
          style={{
            transform: isHovering ? `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)` : 'none',
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-300/20 blur-[100px] opacity-40"
          style={{
            transform: isHovering ? `translate(${mousePosition.x * -0.005}px, ${mousePosition.y * -0.005}px)` : 'none',
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 md:left-20 w-16 h-16 border-4 border-blue-200/50 rounded-xl transform rotate-12 hidden md:block"></div>
        <div className="absolute bottom-20 right-10 md:right-20 w-20 h-20 border-4 border-purple-200/50 rounded-full transform -rotate-12 hidden md:block"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div 
          className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto gap-12 lg:gap-8"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[55%] relative"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -top-16 -left-10 hidden lg:block"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-lg border border-blue-50 transform rotate-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">5,000+ Professionals</span>
              </div>
            </motion.div>
            
            {/* Floating badge 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-12 right-10 hidden lg:block"
            >
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-lg border border-purple-50 transform -rotate-2">
                <Building className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">200+ Inclusive Employers</span>
              </div>
            </motion.div>
            
            {/* Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 mb-5 text-sm font-semibold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full shadow-sm border border-blue-100"
            >
              <Sparkles className="w-4 h-4" />
              <span>Empowering Careers, Connecting Talent</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  YOUR BRIDGE
                </span>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="absolute h-1 bg-gradient-to-r from-blue-400 to-purple-400 bottom-0 left-0 -mb-2"
                ></motion.div>
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TO SUCCESS</span>
              <br />
              <span className="relative z-10 text-gray-800 mt-3 block">
                CONNECTING
                <br />TALENT, IGNITING
                <span className="relative">
                  <span className="relative z-10">OPPORTUNITIES</span>
                  <svg className="absolute -bottom-2 -left-2 w-full h-3 text-purple-200" style={{ width: "calc(100% + 16px)" }} viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed max-w-xl mb-8"
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
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Find Jobs
                    <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                </motion.button>
              </Link>
              
              <Link href="/employers">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-14 px-8 border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50 text-lg font-medium rounded-xl shadow-sm transition-all duration-300 hover:shadow flex items-center gap-2"
                >
                  <Briefcase className="w-5 h-5" />
                  Post Jobs
                </motion.button>
              </Link>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>Verified employers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>Inclusive environment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span>Personalized recommendations</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Side - 3D Interactive Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[45%] relative"
          >
            {/* Main image container with 3D transform effect */}
            <div 
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden perspective-1000 shadow-2xl group"
              style={{
                transform: isHovering ? 
                  `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.005}deg) rotateX(${(window.innerHeight / 2 - mousePosition.y) * 0.005}deg)` : 
                  'perspective(1000px)',
                transition: 'transform 0.2s ease-out'
              }}
            >
              Main image
              <div className="absolute inset-0 overflow-hidden">
                <Image 
                  src="/images/Hero.jpg" 
                  alt="Professionals connecting and working"
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-gray-900/20"></div>
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Our Community</h3>
                <p className="text-white/90 mb-6 max-w-md">
                  Connect with employers who value your unique talents and are committed to creating inclusive workplaces.
                </p>
                
                {/* Stats indicators */}
                <div className="flex flex-wrap gap-3 mb-2">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>5,000+ Professionals</span>
                  </div>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>200+ Inclusive Employers</span>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-10 -right-8 md:right-8 w-40 h-32 transform rotate-6"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-purple-600/40 backdrop-blur-sm rounded-lg"></div>
                  <div className="relative z-10 p-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-white text-sm font-medium">Find Your Perfect Role</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                variants={floatingVariants}
                animate="animate"
                custom={1.5}
                className="absolute bottom-20 -left-8 md:left-10 w-36 h-28 transform -rotate-3"
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 to-pink-600/40 backdrop-blur-sm rounded-lg"></div>
                  <div className="relative z-10 p-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mb-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-white text-xs font-medium">Connect with Inclusive Employers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
