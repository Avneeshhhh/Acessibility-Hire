"use client";
import React from 'react';
import NavBar from '@/components/custom/Navigation/NavBar';
import Footer from '@/components/custom/Navigation/Footer';
import { Building2, Users, Target, Heart, Award, Globe } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: Building2,
      title: "Our Mission",
      description: "To revolutionize the hiring process by making it more accessible and inclusive for everyone, regardless of their abilities or background."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "A diverse group of professionals passionate about accessibility and inclusion in the workplace."
    },
    {
      icon: Target,
      title: "Our Vision",
      description: "To create a world where every individual has equal opportunities to showcase their talents and contribute to society."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "Inclusivity, accessibility, innovation, and excellence in everything we do."
    },
    {
      icon: Award,
      title: "Our Impact",
      description: "Helping companies build diverse and inclusive teams while connecting talented individuals with meaningful opportunities."
    },
    {
      icon: Globe,
      title: "Our Reach",
      description: "Serving a global community of job seekers and employers committed to accessibility and inclusion."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              About Accessibility Hire
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Empowering inclusive hiring through innovative technology and unwavering commitment to accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-black text-white mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="lg:text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Story</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Accessibility Hire was founded with a simple yet powerful mission: to make the hiring process more accessible and inclusive for everyone. We recognized that traditional hiring platforms often created barriers for individuals with disabilities and other underrepresented groups.
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Today, we're proud to be at the forefront of accessible hiring technology, helping companies build diverse and inclusive teams while connecting talented individuals with meaningful opportunities.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
