"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Companies = () => {
  // Array of company logos
  const companyLogos = [
    { src: "/images/companies/microsoft.svg", alt: "Microsoft" },
    { src: "/images/companies/google.svg", alt: "Google" },
    { src: "/images/companies/amazon.svg", alt: "Amazon" },
    { src: "/images/companies/ibm.svg", alt: "IBM" },
    { src: "/images/companies/salesforce.svg", alt: "Salesforce" },
    { src: "/images/companies/apple.svg", alt: "Apple" },
    { src: "/images/companies/cisco.svg", alt: "Cisco" },
    { src: "/images/companies/intel.svg", alt: "Intel" },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-bold text-blue-700 rounded-full border border-blue-100 bg-white">
            <Building className="w-4 h-4 text-blue-500" />
            <span>PARTNER COMPANIES</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Inclusive <span className="text-blue-700">Employers</span> Trust Us
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Join hundreds of forward-thinking companies that are committed to building diverse and accessible workplaces.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Container for logos */}
          <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-200 p-8 md:p-10">
            
            {/* Company logos - Static display with responsive grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {companyLogos.map((company, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={company.src}
                    alt={company.alt}
                    width={120}
                    height={50}
                    className="max-h-12 w-auto object-contain filter grayscale hover:grayscale-0 hover:filter-none transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Want to showcase your company?
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our partner network and connect with talented professionals who will enhance your workforce.
              </p>
              <Link href="/employers">
                <button className="py-3 px-7 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 mx-auto">
                  Become a Partner
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
