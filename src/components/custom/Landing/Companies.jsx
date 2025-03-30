"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Companies = () => {
  // Updated company logos with more reliable sources
  const companies = [
    { 
      name: 'Google', 
      logo: 'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg'
    },
    { 
      name: 'Microsoft', 
      logo: 'https://img.icons8.com/color/480/microsoft.png'
    },
    { 
      name: 'Amazon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    },
    { 
      name: 'Facebook',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png'
    },
    { 
      name: 'Twitter',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg'
    },
    { 
      name: 'Slack', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg'
    },
    { 
      name: 'LinkedIn', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg'
    },
    { 
      name: 'Salesforce',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
    },
    // Duplicate for seamless loop
    { 
      name: 'Google', 
      logo: 'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg'
    },
    { 
      name: 'Microsoft', 
      logo: 'https://img.icons8.com/color/480/microsoft.png'
    },
    { 
      name: 'Amazon', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    },
    { 
      name: 'Facebook', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png'
    },
    { 
      name: 'Twitter', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg'
    },
    { 
      name: 'Slack', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg'
    },
    { 
      name: 'LinkedIn', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg'
    },
    { 
      name: 'Salesforce', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg'
    }
  ];

  return (
    <section className="py-12 bg-[#F8F8F9] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#25272A] mb-2">
            Teams hiring with Hiremod
          </h2>
          <p className="text-[#6B7280]">
            Join hundreds of companies using Hiremod to transform their hiring
          </p>
        </div>

        {/* Scrolling Logos Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#F8F8F9] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#F8F8F9] to-transparent z-10"></div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ willChange: 'transform' }}
            className="flex items-center gap-16 w-fit"
          >
            {companies.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-75 hover:opacity-100 shrink-0"
              >
                <div className="w-32 h-16 relative">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Companies;
