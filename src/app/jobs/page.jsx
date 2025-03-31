"use client";

import React, { useEffect } from 'react';
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";
import ClientJobBoardSection from "@/components/custom/Landing/ClientJobBoardSection";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import { motion } from 'framer-motion';
import { Briefcase, Search, MapPin, Filter, ArrowRight } from 'lucide-react';

export default function JobsPage() {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <div className="pt-16"> 
        {/* Enhanced Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100/60"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70"></div>
          
          {/* Animated Blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-gray-200/20 blur-[150px]" 
            aria-hidden="true"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
            className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-gray-300/20 blur-[120px]" 
            aria-hidden="true"
          ></motion.div>

          {/* Decorative elements */}
          <div className="absolute top-[10%] right-[15%] w-16 h-16 rounded-xl border border-gray-200 bg-white/30 backdrop-blur-md rotate-12 opacity-60" aria-hidden="true"></div>
          <div className="absolute bottom-[20%] left-[20%] w-12 h-12 rounded-xl border border-gray-200 bg-white/30 backdrop-blur-md -rotate-12 opacity-60" aria-hidden="true"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto text-center"
            >
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-medium bg-gradient-to-r from-gray-800 to-black text-white rounded-full shadow-lg shadow-gray-500/20"
              >
                <Briefcase className="w-4 h-4" />
                <span>Career Opportunities</span>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-black drop-shadow-sm"
              >
                Find Your Perfect Job Match
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                Discover opportunities from inclusive employers committed to creating accessible workplaces for professionals with disabilities.
              </motion.p>

              {/* Advanced Search Box */}
              <motion.div 
                variants={itemVariants}
                className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 mb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Job title or keyword" 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Location or remote" 
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <button className="py-3 px-6 bg-gray-900 hover:bg-black text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Jobs
                  </button>
                </div>
              </motion.div>
              
              <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-sm text-gray-600">
                <span className="font-medium">Popular searches:</span>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Remote</button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Software Developer</button>
                <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">Accessible Design</button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Add a quick category section */}
        {/* <section className="py-10 bg-gray-50/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
                <a href="#all-jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  Browse All Categories <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {['Tech & IT', 'Design & Creative', 'Customer Support', 'Marketing', 'Administrative', 'Business Operations', 'Engineering', 'Healthcare'].map((category, index) => (
                  <motion.div 
                    key={category}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{category}</h3>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 20} opportunities</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section> */}
        
        {/* Job Board Section */}
        <div id="all-jobs">
          <ClientJobBoardSection />
        </div>
      </div>
      <Footer />
      <ChatBotWrapper />
    </main>
  );
} 