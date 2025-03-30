"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Target, LineChart, Sparkles, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Our advanced algorithms analyze recruitment data to provide actionable insights and predictions.",
      iconBg: "from-blue-400 to-blue-600"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Connect with candidates whose skills and aspirations align perfectly with your requirements.",
      iconBg: "from-purple-400 to-indigo-600"
    },
    {
      icon: LineChart,
      title: "Data-Driven Results",
      description: "Make decisions based on real performance metrics that directly impact your hiring success.",
      iconBg: "from-teal-400 to-emerald-600"
    }
  ];

  return (
    <section ref={containerRef} id="about" className="py-36 md:py-40 relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/20 to-white">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-300/10 blur-[120px] opacity-40 animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[600px] h-[600px] rounded-full bg-purple-300/10 blur-[150px] opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border-8 border-blue-100/20 rounded-full transform -rotate-12 hidden lg:block"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 border-4 border-purple-100/30 rounded-xl transform rotate-12 hidden lg:block"></div>
      <div className="absolute top-1/2 right-10 w-40 h-1 bg-gradient-to-r from-blue-500/20 to-transparent hidden lg:block"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500 opacity-30"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm border border-blue-100 bg-white">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>ABOUT US</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500 opacity-30"></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Reimagining
            </span> recruitment for the <br /> 
            <span className="relative inline-block">
              modern era
              <motion.div
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                className="absolute h-1 bg-gradient-to-r from-blue-400 to-purple-400 bottom-0 left-0 -mb-2"
              ></motion.div>
            </span>
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            We're building the future of hiring by combining human expertise with cutting-edge AI technology.
          </motion.p>
        </motion.div>

        {/* Content Grid - Full Width */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="group"
              >
                <div className="relative p-6 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-bl from-blue-100 to-transparent opacity-30 transform translate-x-10 -translate-y-10 rounded-full"></div>
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.iconBg} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-12"
          >
            <Link href="/about">
              <button className="group relative overflow-hidden py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Learn more about us
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Add some custom styles for the animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default About;
