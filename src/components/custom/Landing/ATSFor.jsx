"use client";
import React, { useState } from 'react';
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
    image: "/images/temp1.jpeg",
    benefits: ["Curated job posts from inclusive employers", "Filter by accessibility accommodations", "Companies verified for inclusion practices"]
  },
  {
    id: 'connecting-with-employers',
    title: "Connect With Inclusive Employers",
    description: "Build relationships with companies that prioritize diversity, equity, and inclusion.",
    icon: Building,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img2.jpg",
    benefits: ["Direct messaging with hiring managers", "Company profiles highlighting inclusion initiatives", "Networking events and webinars"]
  },
  {
    id: 'benefits-from-resources',
    title: "Specialized Career Resources",
    description: "Access tailored resources designed for professionals with disabilities to advance your career.",
    icon: Award,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/temp2.jpeg",
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
    image: "/images/img5.jpeg"
  },
  {
    id: 'commitment-to-diversity-inclusion',
    title: "Showcase Your Commitment",
    description: "Demonstrate your organization's dedication to diversity and inclusion, attracting top talent.",
    icon: Award,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/img6.jpg"
  },
  {
    id: 'simple-hiring-process',
    title: "Streamlined Hiring Process",
    description: "Simplify your recruitment with user-friendly tools designed to connect you with the right candidates.",
    icon: Zap,
    color: "text-[#4169E1]",
    bgColor: "bg-blue-100",
    image: "/images/temp2.jpeg"
  }
];

const ATSFor = () => {
  const [activeJobSeekerFeature, setActiveJobSeekerFeature] = useState(jobSeekerFeatures[0].id);
  const [activeEmployerFeature, setActiveEmployerFeature] = useState(employerFeatures[0].id);
  
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
    <div className="py-20 w-full bg-white">
      {/* Job Seekers Section */}
      <section className="py-24 w-full relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-b from-blue-100 to-transparent opacity-50 rounded-full blur-3xl"></div>
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-100 to-transparent opacity-50 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/images/dots-pattern.png')] bg-repeat opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section Header with floating elements */}
          <div className="relative">
            {/* Animated floating elements */}
            <motion.div 
              initial={{ opacity: 0, y: 20, x: -50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute -left-16 top-0 hidden lg:block"
            >
              <div className="w-28 h-28 rounded-2xl bg-blue-50 border border-blue-100 shadow-lg p-5 transform rotate-12">
                <Users className="w-full h-full text-blue-500 opacity-60" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20, x: 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -right-16 top-20 hidden lg:block"
            >
              <div className="w-24 h-24 rounded-full bg-purple-50 border border-purple-100 shadow-lg p-5 transform -rotate-6">
                <Building className="w-full h-full text-purple-500 opacity-60" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16 relative z-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-semibold bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 rounded-full shadow-sm border border-blue-100">
                <Users className="w-4 h-4" />
                <span>Career Empowerment</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Unlocking</span> Career 
                <br className="hidden md:block" /> 
                <span className="relative">
                  Possibilities
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200 opacity-70" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                We're redefining how professionals with disabilities connect with inclusive employers and life-changing opportunities through innovative technology.
              </p>
            </motion.div>
          </div>

          {/* Main Feature Showcase */}
          <div className="max-w-7xl mx-auto">
            {/* 3D Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {jobSeekerFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  className="group"
                >
                  <div className="h-full bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transform perspective-1000 transition-all duration-500 hover:shadow-2xl">
                    {/* Card Top Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center border border-white z-10 transition-transform duration-300 group-hover:scale-110">
                        <feature.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      
                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 p-4 w-full">
                        <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                        <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-5">
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      
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

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <Link href="/jobs">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <span>Explore Career Opportunities</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-500">Join 5,000+ professionals</span>
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-500">200+ inclusive employers</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Employers Section */}
      <section className="w-full relative overflow-hidden py-24">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-50/80 via-white to-purple-50/80">
          <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-100 to-transparent opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 left-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-transparent opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-40 h-40 border-8 border-blue-100/30 rounded-3xl transform rotate-12 hidden lg:block"></div>
        <div className="absolute top-1/3 left-10 w-20 h-20 border-4 border-purple-100/40 rounded-full transform -rotate-12 hidden lg:block"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 border-4 border-blue-100/30 rounded-xl transform rotate-45 hidden lg:block"></div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Section Header with interactive elements */}
          <div className="relative">
            {/* Floating elements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute -top-10 -left-10 hidden lg:block"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 p-5 shadow-lg backdrop-blur-sm transform rotate-12 border border-blue-100">
                <Building className="h-12 w-12 text-blue-500" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -top-5 -right-10 hidden lg:block"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-purple-600/20 p-5 shadow-lg backdrop-blur-sm border border-purple-100">
                <Award className="h-10 w-10 text-purple-500" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-16 relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 mb-5 text-sm font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 rounded-full shadow-sm border border-blue-200">
                <Building className="w-4 h-4" />
                <span>For Forward-Thinking Employers</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Inclusive Hiring</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Connect with exceptional talent and build a workforce that thrives on diversity, innovation and inclusion through our specialized platform.
              </p>

              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-32 h-12"
              >
                <svg viewBox="0 0 100 50" className="w-full h-full text-blue-100">
                  <path d="M 0,0 Q 50,50 100,0" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Main Feature Area with 3D Cards */}
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - 3D Visual */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl perspective-1000">
                  {/* Main image */}
                  <Image
                    src="/images/img5.jpeg"
                    alt="Inclusive workplace meeting"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10"></div>
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-20">
                    <h3 className="text-3xl font-bold text-white mb-3">Join Leading Employers</h3>
                    <p className="text-white/90 mb-6 max-w-md">
                      Join hundreds of forward-thinking companies creating more diverse and inclusive workplaces.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">200+ Inclusive Employers</div>
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">5,000+ Diverse Candidates</div>
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">90% Satisfaction Rate</div>
                    </div>
                  </div>
                  
                  {/* Floating stats card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute top-6 right-6 max-w-[180px] bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">Hiring Success</div>
                        <div className="text-2xl font-bold text-blue-600">94%</div>
                        <div className="text-xs text-gray-500">Above industry average</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Right Side - Interactive Features */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                {employerFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className={`relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
                      activeEmployerFeature === feature.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}>
                      <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-blue-100 to-transparent opacity-30 transform translate-x-10 -translate-y-10 rounded-full"></div>
                      
                      <div className="flex items-start gap-5">
                        <div className="shrink-0">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 transition-transform duration-300 group-hover:scale-110">
                            <feature.icon className="h-7 w-7 text-blue-600" />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {feature.description}
                          </p>
                          
                          <button 
                            onClick={() => setActiveEmployerFeature(feature.id)}
                            className={`inline-flex items-center text-sm font-medium ${
                              activeEmployerFeature === feature.id ? 'text-blue-600' : 'text-gray-500'
                            } hover:text-blue-600 transition-colors`}
                          >
                            <span>Learn more</span>
                            <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pt-4"
                >
                  <Link href="/employers">
                    <button className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group relative overflow-hidden">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Post Jobs and Connect
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
                    </button>
                  </Link>
                  
                  {/* Trust indicators */}
                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Secure platform</span>
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Dedicated support</span>
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Proven results</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      </div>
    </div>
  );
};

export default ATSFor;
