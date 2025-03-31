"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building, Award, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const jobSeekerFeatures = [
  {
    id: 'inclusive-job-listing',
    title: "Access Inclusive Job Listings",
    description: "Discover job opportunities from employers committed to disability inclusion and accessibility.",
    icon: Users,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/image1.jpeg",
    benefits: ["Curated job posts from inclusive employers", "Filter by accessibility accommodations", "Companies verified for inclusion practices"]
  },
  {
    id: 'connecting-with-employers',
    title: "Connect With Inclusive Employers",
    description: "Build relationships with companies that prioritize diversity, equity, and inclusion.",
    icon: Building,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img5.jpg",
    benefits: ["Direct messaging with hiring managers", "Company profiles highlighting inclusion initiatives", "Networking events and webinars"]
  },
  {
    id: 'benefits-from-resources',
    title: "Specialized Career Resources",
    description: "Access tailored resources designed for professionals with disabilities to advance your career.",
    icon: Award,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img6.jpeg",
    benefits: ["Resume building tailored for accessibility", "Interview preparation guides", "Career development webinars"]
  }
];

const employerFeatures = [
  {
    id: 'highly-qualified-professionals',
    title: "Access Qualified Talent",
    description: "Connect with highly qualified professionals with disabilities to build a diverse, talented team.",
    icon: Users,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img8.jpeg"
  },
  {
    id: 'commitment-to-diversity-inclusion',
    title: "Showcase Your Commitment",
    description: "Demonstrate your organization's dedication to diversity and inclusion, attracting top talent.",
    icon: Award,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img9.jpeg"
  },
  {
    id: 'simple-hiring-process',
    title: "Streamlined Hiring Process",
    description: "Simplify your recruitment with user-friendly tools designed to connect you with the right candidates.",
    icon: Zap,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img7.jpeg"
  }
];

const ATSFor = () => {
  const [activeJobSeekerFeature, setActiveJobSeekerFeature] = useState(jobSeekerFeatures[0].id);
  const [activeEmployerFeature, setActiveEmployerFeature] = useState(employerFeatures[0].id);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure component only renders fully on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const activeJobSeekerData = jobSeekerFeatures.find(f => f.id === activeJobSeekerFeature);
  const activeEmployerData = employerFeatures.find(f => f.id === activeEmployerFeature);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="py-12 w-full bg-white">
      {/* Job Seekers Section */}
      <section className="py-20 w-full relative overflow-hidden">
        {/* Background Elements - Enhanced */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-40"></div>
          {/* Enhanced background circles */}
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gray-100/20 blur-[120px] opacity-30" aria-hidden="true"></div>
          <div className="absolute bottom-20 right-10 w-[400px] h-[400px] rounded-full bg-purple-100/20 blur-[80px] opacity-20" aria-hidden="true"></div>
        </div>

        <div className="container-fluid mx-auto px-3 sm:px-5 md:px-6 lg:px-10 xl:px-14 2xl:px-16 max-w-[1920px] relative z-10">
          {/* Section Header - More Prominent */}
          <div className="text-center max-w-4xl mx-auto mb-14">
            {/* <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-semibold bg-gray-50 text-gray-800 rounded-full border border-gray-200">
              <Users className="w-4 h-4" />
              <span>Career Empowerment</span>
            </div> */}
            
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              <span className="text-gray-800">Unlocking</span> Career 
              <span className="relative"> Possibilities</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We're redefining how professionals with disabilities connect with inclusive employers and life-changing opportunities through innovative technology.
            </p>
          </div>

          {/* Main Feature Showcase */}
          {isClient && (
            <div className="max-w-[1800px] mx-auto">
              {/* Feature Cards - Larger Grid with wider spacing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-16 px-0 xl:px-8 2xl:px-16">
                {jobSeekerFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="h-full bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg">
                      {/* Card Top Image - Increased Height */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center border border-white z-10">
                          <feature.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        
                        {/* Title Overlay */}
                        <div className="absolute bottom-0 left-0 p-4 w-full">
                          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                        </div>
                      </div>
                      
                      {/* Card Content - More Spacious */}
                      <div className="p-5">
                        <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                        
                        {/* Benefits List */}
                        <div className="space-y-2">
                          {feature.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mt-0.5">
                                <CheckCircle className="w-3 h-3 text-blue-600" />
                              </div>
                              <span className="text-sm text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action - Larger */}
              <div className="text-center">
                <Link href="/jobs">
                  <button className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 hover:bg-black text-white text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
                    <span>Explore Career Opportunities</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                
                <div className="mt-5 flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-500">Join 5,000+ professionals</span>
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-500">200+ inclusive employers</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Employers Section - Expanded */}
      <section className="w-full relative overflow-hidden py-16 bg-gray-50">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] opacity-40"></div>
          {/* Enhanced background circles */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gray-200/10 blur-[100px] opacity-30" aria-hidden="true"></div>
          <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-200/10 blur-[80px] opacity-20" aria-hidden="true"></div>
        </div>

        <div className="container-fluid mx-auto px-3 sm:px-5 md:px-6 lg:px-10 xl:px-14 2xl:px-16 max-w-[1920px] relative z-10">
          {/* Section Header - More Compact */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-semibold bg-gray-100 text-gray-800 rounded-full border border-gray-200">
              <Building className="w-3.5 h-3.5" />
              <span>For Forward-Thinking Employers</span>
            </div> */}
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Transform Your <span className="text-gray-800">Inclusive Hiring</span>
            </h2>
            
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with exceptional talent and build a workforce that thrives on diversity, innovation and inclusion.
            </p>
          </div>

          {/* Main Feature Area - Expanded Grid */}
          {isClient && (
            <div className="max-w-[1800px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start px-0 xl:px-8 2xl:px-16">
                {/* Left Side - Visual with height matching right side */}
                <div className="relative h-full flex justify-center lg:justify-end xl:pr-8">
                  <div className="relative h-[420px] w-[800px] max-w-5xl lg:max-w-full rounded-lg overflow-hidden shadow-lg">
                    {/* Main image */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeEmployerFeature}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={activeEmployerData.image || "/images/img5.jpeg"}
                          alt={activeEmployerData.title || "Inclusive workplace meeting"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                          className="object-cover"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                    
                    {/* Overlay content - Better positioned */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16">
                      <h3 className="text-xl font-bold text-white mb-2">Join Leading Employers</h3>
                      <p className="text-white/90 mb-3 text-sm max-w-md">
                        Join hundreds of forward-thinking companies creating more diverse and inclusive workplaces.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">200+ Inclusive Employers</div>
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">5,000+ Diverse Candidates</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Interactive Features with better spacing */}
                <div className="space-y-5 h-full flex flex-col justify-between max-w-2xl mx-auto lg:mx-0 lg:ml-0 xl:pl-8">
                  {employerFeatures.map((feature, index) => (
                    <div
                      key={feature.id}
                      className="group cursor-pointer"
                      onClick={() => setActiveEmployerFeature(feature.id)}
                    >
                      <div className={`relative overflow-hidden rounded-lg border ${
                        activeEmployerFeature === feature.id ? 'border-gray-400 bg-gray-50/50' : 'border-gray-100 bg-white'
                      } p-4 shadow-md transition-all duration-300 hover:shadow-lg ${
                        activeEmployerFeature === feature.id ? 'ring-2 ring-gray-500' : ''
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                            activeEmployerFeature === feature.id 
                              ? 'bg-gray-200 text-gray-900' 
                              : 'bg-gray-100 text-gray-700 group-hover:bg-gray-200 group-hover:text-gray-900'
                          } transition-colors`}>
                            <feature.icon className="w-5 h-5" />
                          </div>
                          
                          <div>
                            <h4 className="text-base font-medium text-gray-900 mb-1">{feature.title}</h4>
                            <p className="text-sm text-gray-700">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 md:mt-12 px-4 md:px-0">
                <Link href="/employers">
                  <button className="inline-flex items-center text-sm md:text-base font-medium text-gray-900 hover:text-black group">
                    Learn more about our ATS 
                    <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ATSFor;