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
      title: "Inclusion",
      description: "Everyone deserves equal opportunities. We work to ensure individuals with disabilities can access the same job opportunities as anyone else.",
      color: "linear-gradient(to bottom right, #3b82f6, #1d4ed8)",
      link: "/features"
    },
    {
      icon: Target,
      title: "Empowerment",
      description: "We believe that by removing barriers to employment, we empower individuals to succeed and companies to benefit from the talents and perspectives they bring.",
      color: "linear-gradient(to bottom right, #8b5cf6, #4f46e5)",
      link: "/features"
    },
    {
      icon: LineChart,
      title: "Innovation",
      description: "We are always looking for ways to leverage technology to improve accessibility and enhance the work experience for all.",
      color: "linear-gradient(to bottom right, #10b981, #059669)",
      link: "/features"
    },
    {
      icon: Sparkles,
      title: "Integrity",
      description: "We operate with honesty and transparency in everything we do, from the services we offer to how we handle your personal data.",
      color: "linear-gradient(to bottom right, #f59e0b, #d97706)",
      link: "/features"
    }
  ];

  return (
    <section ref={containerRef} id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/10 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        {/* Section Header - Left Aligned with scroll hint */}
        <div className="text-left max-w-4xl mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            <span className="text-gray-800">
              Welcome to
            </span> Accessibility Hire
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mb-6">
            Your go-to resource for inclusive hiring and technology solutions designed to support people with diverse abilities. Our mission is to connect individuals with disabilities to workplaces that prioritize accessibility, creating inclusive environments where everyone can thrive.
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mb-6">
            We believe that diversity isn't just a buzzword—it's a vital asset. By leveraging innovative technology strategies and focusing on accessibility in hiring, we help both employers and candidates reach their full potential.
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mb-6">
            Accessibility Hire offers a range of services to both job seekers and employers. From job placement to accessibility consultation, we aim to eliminate barriers in the hiring process and create equal opportunities for all.
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mb-6">
            At Innovative Technology Strategies Inc. (ITS), the parent company behind Accessibility Hire, we also focus on broader technology solutions aimed at improving the work experience for individuals with disabilities.
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
            Thank you for choosing Accessibility Hire as your trusted partner in inclusive hiring. We're excited to be part of your journey toward greater accessibility and opportunity.
          </p>
        </div>

        {/* Core Values Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">Our Core Values</h3>
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button - Left Aligned */}
        <div className="flex justify-start mt-10 md:mt-16">
          <Link href="/contact">
            <button className="py-3 px-7 bg-gray-900 hover:bg-black text-white text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2">
              Get in touch with us
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
