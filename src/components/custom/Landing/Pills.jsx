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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-full bg-[url('/images/hex-pattern.png')] bg-repeat bg-[length:400px_400px]"></div>
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header with gradient accent */}
        <div className="mb-16 max-w-3xl relative">
          <div className="w-20 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6"></div>
          <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 uppercase tracking-wider mb-3 block">
            NEXT-GEN TALENT ACQUISITION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Beyond Traditional<br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Hiring Pipelines</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our intelligent platform transforms how you discover and secure top talent, combining cutting-edge AI technology with human-centered processes to reduce time-to-hire while maximizing quality matches.
          </p>
        </div>

        {/* Interactive Process Showcase */}
        <div className="flex flex-col lg:flex-row items-start gap-16 mb-20">
          {/* Left Side - Interactive Steps */}
          <div className="w-full lg:w-[45%] space-y-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="relative"
            >
              {/* Progress Track */}
              <div className="absolute left-[27px] top-[75px] h-[calc(100%-150px)] w-1 bg-gray-200 rounded-full"></div>
              
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="relative"
                >
                  <button 
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left mb-8 group transition-all duration-300 ${
                      activeStep === index ? "scale-105" : "hover:scale-102"
                    }`}
                  >
                    <div className="flex items-start">
                      {/* Step marker with animated progress fill */}
                      <div className="relative mr-6">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${
                          index <= activeStep 
                            ? "bg-gradient-to-br from-blue-500 to-indigo-600" 
                            : "bg-white"
                        }`}>
                          <span className={`text-lg font-bold ${
                            index <= activeStep ? "text-white" : "text-gray-400"
                          }`}>{index + 1}</span>
                        </div>
                        {/* Active indicator */}
                        {activeStep === index && (
                          <div className="absolute -inset-1 border-2 border-blue-500 rounded-full animate-pulse"></div>
                        )}
                        
                        {/* Completed step checkmark */}
                        {index < activeStep && (
                          <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Step Content Card */}
                      <div className={`flex-1 p-6 rounded-xl transition-all duration-300 ${
                        activeStep === index 
                          ? "bg-white shadow-xl border border-blue-100" 
                          : "bg-white/60 shadow-md hover:shadow-lg border border-gray-100"
                      }`}>
                        <div className="flex items-start gap-4">
                          <div className={`shrink-0 w-12 h-12 ${step.iconBg} rounded-lg flex items-center justify-center shadow-lg transform transition-transform ${
                            activeStep === index ? "scale-110" : "group-hover:scale-105"
                          }`}>
                            <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className={`text-xl font-bold transition-colors ${
                                activeStep === index ? "text-blue-600" : "text-gray-800"
                              }`}>
                                {step.title}
                              </h3>
                              {activeStep === index && (
                                <ChevronRight className="w-5 h-5 text-blue-500" />
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">
                              {step.description}
                            </p>
                            <div className="flex items-center text-xs font-semibold text-blue-600 bg-blue-50 rounded-full py-1 px-3 w-fit">
                              <Activity className="w-3 h-3 mr-1" />
                              {step.stats}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Dynamic Visual */}
          <div className="w-full lg:w-[55%]">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white group">
              {/* Main visualization */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="h-full w-full"
                >
                  <Image
                    src={`/images/process-${activeStep + 1}.jpg`}
                    alt={steps[activeStep].title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20"></div>
                </motion.div>
              </div>

              {/* Feature highlight cards */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  key={`details-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-lg">
                    {steps[activeStep].description}
                  </p>
                  
                  {/* AI Processing Indicator */}
                  <div className="inline-flex bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${steps[activeStep].iconBg} flex items-center justify-center`}>
                        {React.createElement(steps[activeStep].icon, { className: "w-5 h-5 text-white" })}
                      </div>
                      <div>
                        <div className="text-white font-medium">Intelligent Analysis</div>
                        <div className="text-white/70 text-sm flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                          Processing candidate data...
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Feature-specific floating card */}
              <motion.div
                key={`card-${activeStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${steps[activeStep].iconBg} flex items-center justify-center`}>
                    {React.createElement(steps[activeStep].icon, { className: "w-5 h-5 text-white" })}
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold text-sm">
                      Step {activeStep + 1} of 3
                    </div>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
                        style={{ width: `${((activeStep + 1) / 3) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Metrics Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants} 
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <metric.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {metric.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Add some custom styles for the animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default Pills;
