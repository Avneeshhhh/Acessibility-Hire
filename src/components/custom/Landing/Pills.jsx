"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, Calendar, Clock, CheckCircle, ChevronRight, Activity, Users } from 'lucide-react';
import Image from 'next/image';

const Pills = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      icon: Upload,
      title: "Define Your Ideal Candidate",
      description: "Upload your requirements or use our AI-assisted tool to craft the perfect job profile in minutes.",
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
      iconColor: "text-white",
      stats: "75% faster profile creation"
    },
    {
      icon: Brain,
      title: "AI-Powered Talent Matching",
      description: "Our advanced algorithms analyze thousands of profiles to find perfect matches beyond keywords.",
      iconBg: "bg-gradient-to-br from-purple-400 to-indigo-600",
      iconColor: "text-white",
      stats: "93% match precision"
    },
    {
      icon: Calendar,
      title: "Seamless Transition to Hiring",
      description: "Schedule interviews, collect feedback, and make offers all within our intelligent platform.",
      iconBg: "bg-gradient-to-br from-teal-400 to-emerald-600",
      iconColor: "text-white",
      stats: "65% reduced time-to-hire"
    }
  ];

  const metrics = [
    { value: "75%", label: "Recruitment Time Saved", icon: Clock },
    { value: "93%", label: "Candidate Quality", icon: CheckCircle },
    { value: "3.5x", label: "Interview-to-Hire Ratio", icon: Activity },
    { value: "80%", label: "Retention Improvement", icon: Users }
  ];

  // Simple animation variants with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section className="py-10 md:py-16 lg:py-20 relative overflow-hidden bg-white">
      {/* Removed animated gradient orbs for better performance */}
      <div className="absolute inset-0 bg-blue-50/50"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10 max-w-5xl">
        {/* Section Header with improved text contrast */}
        <div className="mb-8 md:mb-12 max-w-3xl mx-auto text-center sm:text-left sm:mx-0">
          <div className="w-16 h-2 bg-blue-600 rounded-full mb-4 mx-auto sm:mx-0"></div>
          <span className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2 block">
            NEXT-GEN TALENT ACQUISITION
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Beyond Traditional<br /> 
            <span className="text-blue-800">Hiring Pipelines</span>
          </h2>
          <p className="text-gray-900 text-sm md:text-base leading-relaxed max-w-2xl mx-auto sm:mx-0">
            Our intelligent platform transforms how you discover and secure top talent, combining cutting-edge AI technology with human-centered processes to reduce time-to-hire while maximizing quality matches.
          </p>
        </div>

        {/* Interactive Process Showcase with improved visibility */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 md:gap-8 mb-10 md:mb-16">
          {/* Left Side - Interactive Steps */}
          <div className="w-full lg:w-[48%] space-y-4">
            <div className="relative">
              {/* Progress Track */}
              <div className="absolute left-[23px] top-[60px] h-[calc(100%-120px)] w-1 bg-gray-200 rounded-full"></div>
              
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <button 
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left mb-5 group transition-all duration-200 ${
                      activeStep === index ? "scale-[1.02]" : "hover:scale-[1.01]"
                    }`}
                  >
                    <div className="flex items-start">
                      {/* Step marker with simpler design */}
                      <div className="relative mr-3 md:mr-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md border-2 border-white ${
                          index <= activeStep 
                            ? "bg-blue-600" 
                            : "bg-white"
                        }`}>
                          <span className={`text-sm md:text-base font-bold ${
                            index <= activeStep ? "text-white" : "text-gray-400"
                          }`}>{index + 1}</span>
                        </div>
                        {/* Simplified active indicator */}
                        {activeStep === index && (
                          <div className="absolute -inset-1 border-2 border-blue-500 rounded-full"></div>
                        )}
                        
                        {/* Completed step checkmark */}
                        {index < activeStep && (
                          <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Step Content Card with better text contrast */}
                      <div className={`flex-1 p-3 md:p-4 rounded-lg transition-all duration-300 ${
                        activeStep === index 
                          ? "bg-white shadow-md border border-blue-100" 
                          : "bg-white shadow-sm hover:shadow border border-gray-100"
                      }`}>
                        <div className="flex items-start gap-2 md:gap-3">
                          <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 ${step.iconBg} rounded-md flex items-center justify-center shadow-md`}>
                            <step.icon className={`w-4 h-4 md:w-5 md:h-5 ${step.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className={`text-base md:text-lg font-bold transition-colors ${
                                activeStep === index ? "text-blue-800" : "text-gray-900"
                              }`}>
                                {step.title}
                              </h3>
                              {activeStep === index && (
                                <ChevronRight className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                            <p className="text-gray-800 text-xs md:text-sm mb-2">
                              {step.description}
                            </p>
                            <div className="flex items-center text-[10px] md:text-xs font-semibold text-blue-800 bg-blue-50 rounded-full py-0.5 px-2 w-fit">
                              <Activity className="w-2.5 h-2.5 mr-1" />
                              {step.stats}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Dynamic Visual with improved visibility */}
          <div className="w-full lg:w-[52%]">
            <div className="relative h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
              {/* Main visualization with optimized image loading */}
              <div className="absolute inset-0 overflow-hidden bg-gray-100">
                <div className="h-full w-full relative">
                  <Image
                    src={`/images/process-${activeStep + 1}.jpg`}
                    alt={steps[activeStep].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={activeStep === 0}
                    className="object-cover"
                    style={{objectFit: 'cover'}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-gray-900/10"></div>
                </div>
              </div>

              {/* Feature highlight cards with improved legibility */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-white/95 mb-3 md:mb-4 max-w-lg text-xs md:text-sm">
                    {steps[activeStep].description}
                  </p>
                  
                  {/* AI Processing Indicator with better visibility */}
                  <div className="inline-flex bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-white/30">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg ${steps[activeStep].iconBg} flex items-center justify-center`}>
                        {React.createElement(steps[activeStep].icon, { className: "w-4 h-4 md:w-5 md:h-5 text-white" })}
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs md:text-sm">Intelligent Analysis</div>
                        <div className="text-white/90 text-[10px] md:text-xs flex items-center">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span>
                          Processing candidate data...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Feature-specific floating card with better visibility */}
              <div
                className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/95 backdrop-blur-sm rounded-md p-2 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${steps[activeStep].iconBg} flex items-center justify-center`}>
                    {React.createElement(steps[activeStep].icon, { className: "w-3 h-3 md:w-4 md:h-4 text-white" })}
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold text-[10px] md:text-xs">
                      Step {activeStep + 1} of 3
                    </div>
                    <div className="w-16 md:w-20 h-1.5 bg-gray-200 rounded-full mt-0.5">
                      <div 
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Metrics Section with improved layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <metric.icon className="w-4 h-4 md:w-5 md:h-5 text-blue-800" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-blue-800 mb-1">
                  {metric.value}
                </div>
                <div className="text-[10px] md:text-xs text-gray-800 font-medium">
                  {metric.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pills;
