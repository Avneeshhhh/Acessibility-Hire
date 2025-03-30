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

  const features = [
    {
      icon: Bell,
      title: "Job Alerts",
      description: "Get the latest jobs sent directly to your inbox with Accessibility Hire Job Alerts.",
      link: "/jobs",
      buttonText: "Set Up Alerts",
      image: "/images/job-alerts.jpg"
    },
    {
      icon: Building,
      title: "Company Search",
      description: "Search our company directory for a list of potential employers by location and sector.",
      link: "/employers",
      buttonText: "Search Companies",
      image: "/images/company-search.jpg"
    },
    {
      icon: Briefcase,
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
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-bold text-blue-700 rounded-full border border-blue-100 bg-white">
            <Network className="w-4 h-4 text-blue-500" />
            <span>CAREER RESOURCES</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            <span className="text-blue-700">Accelerate Your Career</span> Growth
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Connect with inclusive employers and access personalized resources to advance your professional journey
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto mb-14 md:mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`cursor-pointer border ${activeFeature === index ? 'border-blue-500 shadow-md' : 'border-gray-200 shadow-sm'} rounded-xl overflow-hidden bg-white hover:shadow-md transition-all duration-300`}
              onClick={() => setActiveFeature(index)}
            >
              {/* Card Image Section */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                
                {/* Feature Icon */}
                <div className="absolute top-4 right-4 p-2 rounded-md bg-white/30 backdrop-blur-sm">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-5">
                <p className="text-base text-gray-700 mb-5">{feature.description}</p>
                <Link href={feature.link}>
                  <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2">
                    {feature.buttonText}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="md:w-3/5">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Empower Your Professional Journey
                </h3>
                <p className="text-base md:text-lg text-gray-700 mb-6">
                  Join 5,000+ professionals on Accessibility Hire and take control of your career. 
                  Create your profile to unlock opportunities tailored to your unique skills.
                </p>
                
                {/* Benefits List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <benefit.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-base text-gray-700">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-2/5 flex flex-col items-center text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Ready to Get Started?</h4>
                <p className="text-base text-gray-700 mb-5">Create your profile in less than 5 minutes and start connecting with inclusive employers.</p>
                <Link href="/register">
                  <button className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                    Let's Get Started
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerNetwork; 