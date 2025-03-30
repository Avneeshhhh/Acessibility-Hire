"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Target, LineChart, Sparkles, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  const containerRef = useRef(null);
  const featureRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const featureInView = useInView(featureRef, { once: true, amount: 0.2 });
  
  // Feature animation variants
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };
  
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Our advanced algorithms analyze recruitment data to provide actionable insights and predictions.",
      color: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
      link: "/features"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "Connect with candidates whose skills and aspirations align perfectly with your requirements.",
      color: "linear-gradient(to bottom right, #8b5cf6, #4f46e5)",
      link: "/features"
    },
    {
      icon: LineChart,
      title: "Data-Driven Results",
      description: "Make decisions based on real performance metrics that directly impact your hiring success.",
      color: "linear-gradient(to bottom right, #10b981, #059669)",
      link: "/features"
    },
    {
      icon: Sparkles,
      title: "Inclusive Hiring",
      description: "Expand your talent pool with tools specifically designed to reach and engage diverse candidates.",
      color: "linear-gradient(to bottom right, #f59e0b, #d97706)",
      link: "/features"
    }
  ];

  return (
    <section ref={containerRef} id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        {/* Section Header - Left Aligned with scroll hint */}
        <div className="text-left max-w-4xl mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-blue-700 rounded-full border border-blue-100 bg-white">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>ABOUT US</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            <span className="text-blue-700">
              Reimagining
            </span> recruitment for the <br className="hidden md:block" /> 
            <span className="relative inline-block">
              modern era
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
            We're building the future of hiring by combining human expertise with cutting-edge AI technology.
          </p>
        </div>

        {/* Content Grid - Left Aligned - Single row for 4 cards */}
        <div className="w-full overflow-x-auto pb-6 scrollbar-hide mask-fade-right">
          <div className="flex flex-nowrap gap-5 md:gap-6 px-1 py-2 md:pl-0">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                ref={index === 0 ? featureRef : null}
                variants={featureVariants}
                initial="hidden"
                animate={featureInView ? "visible" : "hidden"}
                custom={index}
                className="relative bg-white p-7 md:p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[24%] min-w-[280px]"
              >
                <div className="mb-5 md:mb-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl text-white" style={{ background: feature.color }}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-base md:text-lg text-gray-600 mb-5 md:mb-6">{feature.description}</p>
                
                <Link href={feature.link} className="inline-flex items-center text-base font-medium text-blue-600 hover:text-blue-700">
                  Learn more
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1 w-12 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-blue-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500">Scroll to see more</span>
          </div>
          
          {/* CTA Button - Left Aligned */}
          <div className="flex justify-start mt-10 md:mt-16">
            <Link href="/about">
              <button className="py-3 px-7 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2">
                Learn more about us
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
