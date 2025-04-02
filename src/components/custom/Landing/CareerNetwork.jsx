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
      description: "Get the latest jobs sent directly to your inbox with Accessibility Hire Job Alerts .",
      link: "/jobs",
      buttonText: "Set Up Alerts",
      image: "/images/img4.jpg"
    },
    {
      icon: Building,
      title: "Company Search",
      description: "Search our company directory for a list of potential employers by location and sector.",
      link: "/",
      buttonText: "Search Companies",
      image: "/images/img3.jpeg"
    },
    {
      icon: Briefcase,
      title: "Career Advice",
      description: "Get career advice including interview techniques, resume tips, and job search advice.",
      link: "/",
      buttonText: "Career Advice",
      image: "/images/img2.jpeg"
    },
    
  ];

  const benefits = [
    { icon: Target, text: "Personalized job matches" },
    { icon: Users, text: "Connect with inclusive employers" },
    { icon: Network, text: "Access professional networks" },
    { icon: BookOpen, text: "Expert career resources" }
  ];

  return (
    <section className="py-20 md:py-20 relative overflow-hidden w-full">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/10 to-white"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-40"></div>
        {/* Enhanced background circles */}
        <div className="absolute top-20 right-1/4 w-[500px] h-[500px] rounded-full bg-gray-200/20 blur-[100px] opacity-30" aria-hidden="true"></div>
        <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-gray-300/20 blur-[80px] opacity-20" aria-hidden="true"></div>
      </div>
      
      <div className="container-fluid mx-auto px-3 sm:px-5 md:px-6 lg:px-10 xl:px-14 2xl:px-16 max-w-[1920px] relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16 lg:mb-20">
          {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-bold text-gray-900 rounded-full border border-gray-200 bg-white shadow-sm">
            <Network className="w-4 h-4 text-gray-700" />
            <span>CAREER RESOURCES</span>
          </div> */}
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            <span className="text-gray-800">Accelerate Your Career</span> Growth
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto lg:max-w-4xl">
            Connect with inclusive employers and access personalized resources to advance your professional journey
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-[1800px] mx-auto mb-14 md:mb-16 px-0 xl:px-8 2xl:px-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`cursor-pointer border ${activeFeature === index ? 'border-gray-800 shadow-lg' : 'border-gray-200 shadow-sm'} rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300`}
              onClick={() => setActiveFeature(index)}
            >
              {/* Card Image Section */}
              <div className="relative h-52 md:h-56 lg:h-64 overflow-hidden">
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
                <div className="absolute top-4 right-4 p-2.5 rounded-md bg-white/30 backdrop-blur-sm">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Card Content */}
              <div className="p-6 lg:p-7 flex flex-col justify-between h-[200px]">
                <p className="text-base text-gray-700">{feature.description}</p>
                <Link href={feature.link}>
                  <button className="w-full py-3 bg-gray-900 hover:bg-black text-white text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2">
                    {feature.buttonText}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-[1800px] mx-auto px-0 xl:px-8 2xl:px-16">
          <div className="bg-white rounded-xl p-8 lg:p-10 shadow-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Hiring Process?</h3>
                <p className="text-lg text-gray-700 mb-6">Join thousands of companies who have already modernized their recruitment with our platform.</p>
                <div className="flex flex-wrap gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                      <benefit.icon className="w-5 h-5 text-gray-700" />
                      <span className="text-sm font-medium text-gray-900">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:col-span-1 flex flex-col items-center text-center p-6 lg:p-8 bg-gray-50 rounded-xl border border-gray-200">
                <h4 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 lg:mb-4">Ready to Get Started?</h4>
                <p className="text-base lg:text-lg text-gray-700 mb-5 lg:mb-6">Create your profile in less than 5 minutes and start connecting with inclusive employers.</p>
                <Link href="/">
                  <button className="w-full py-3 px-6 bg-gray-900 hover:bg-black text-white text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
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