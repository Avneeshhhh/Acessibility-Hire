"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bell, Building, Briefcase, Users, ArrowRight, BookOpen, ChevronRight, Sparkles, Network, Target } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const CareerNetwork = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const features = [
    {
      icon: Bell,
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
      title: "Job Alerts",
      description: "Get the latest jobs sent directly to your inbox with Accessibility Hire Job Alerts.",
      link: "/jobs",
      buttonText: "Set Up Alerts",
      image: "/images/job-alerts.jpg"
    },
    {
      icon: Building,
      iconBg: "bg-gradient-to-br from-purple-400 to-indigo-600",
      title: "Company Search",
      description: "Search our company directory for a list of potential employers by location and sector.",
      link: "/employers",
      buttonText: "Search Companies",
      image: "/images/company-search.jpg"
    },
    {
      icon: Briefcase,
      iconBg: "bg-gradient-to-br from-teal-400 to-emerald-600",
      title: "Career Advice",
      description: "Get career advice including interview techniques, resume tips, and job search advice.",
      link: "/resources",
      buttonText: "Career Advice",
      image: "/images/career-advice.jpg"
    }
  ];

  const benefits = [
    { icon: Target, text: "Personalized job matches" },
    { icon: Users, text: "Connect with inclusive employers" },
    { icon: Network, text: "Access professional networks" },
    { icon: BookOpen, text: "Expert career resources" }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-purple-50/10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-300/10 blur-[80px] opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-300/10 blur-[80px] opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500 opacity-30"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-sm border border-blue-100 bg-white">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>CAREER RESOURCES</span>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500 opacity-30"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Accelerate Your Career</span> Growth
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Connect with inclusive employers and access personalized resources to advance your professional journey in a supportive environment
          </p>
        </motion.div>

        {/* Interactive Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className={`group cursor-pointer ${activeFeature === index ? 'ring-2 ring-blue-500 ring-offset-4' : ''}`}
              onClick={() => setActiveFeature(index)}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-2">
                {/* Card Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{feature.title}</h3>
                    <div className="w-10 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                  
                  {/* Feature Icon */}
                  <div className="absolute top-4 right-4 p-2 rounded-lg backdrop-blur-md bg-white/20 border border-white/30">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <Link href={feature.link}>
                    <button className="w-full group relative overflow-hidden h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-md transition-all duration-300 flex items-center justify-center">
                      <span className="relative z-10 flex items-center gap-2">
                        {feature.buttonText}
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with 3D effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 transform rotate-1 rounded-2xl border border-blue-100/30 blur-[2px]"></div>
          <div className="relative bg-white/80 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-blue-100/50 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100/30 rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-100/30 rounded-full filter blur-xl opacity-70"></div>
            
            {/* Diagonal Lines */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="w-full h-full transform -rotate-12">
                <div className="h-24 w-[200%] bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-transparent -translate-x-1/2 translate-y-1/4"></div>
                <div className="h-24 w-[200%] bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-transparent -translate-x-1/2 translate-y-3/4"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="md:w-3/5">
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">
                    Empower Your Professional Journey
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Join 5,000+ professionals on Accessibility Hire and take control of your career. 
                    Create your profile to unlock opportunities tailored to your unique skills and aspirations.
                  </p>
                  
                  {/* Benefits List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <benefit.icon className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-2/5 flex flex-col items-center text-center p-6 bg-gradient-to-b from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Ready to Get Started?</h4>
                  <p className="text-gray-600 mb-6">Create your profile in less than 5 minutes and start connecting with inclusive employers today.</p>
                  <Link href="/register">
                    <button className="group relative overflow-hidden w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Let's Get Started
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerNetwork; 