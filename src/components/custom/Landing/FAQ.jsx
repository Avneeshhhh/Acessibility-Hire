"use client";
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "How does AI improve the recruitment process?",
    answer: "Our AI technology enhances recruitment by automating candidate screening, providing intelligent matching based on skills and experience, and offering predictive analytics for better hiring decisions. This results in faster placements and better candidate matches."
  },
  {
    question: "What makes Accessibility Hire different from other ATS platforms?",
    answer: "Accessibility Hire combines advanced AI capabilities with an intuitive user interface, offering features like automated candidate ranking, smart scheduling, and personalized communication workflows. Our platform is designed to be both powerful and easy to use."
  },
  {
    question: "Can I integrate Accessibility Hire with my existing HR tools?",
    answer: "Yes, Accessibility Hire offers seamless integration with popular HR tools and platforms. Our API-first approach allows for easy connection with your existing tech stack, including HRIS systems, job boards, and calendar applications."
  },
  {
    question: "How secure is my recruitment data with Accessibility Hire?",
    answer: "We prioritize data security with enterprise-grade encryption, regular security audits, and compliance with global data protection regulations including GDPR. Your data is stored in secure, redundant cloud infrastructure."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer comprehensive support including 24/7 technical assistance, dedicated account managers for enterprise clients, regular training sessions, and detailed documentation. Our support team has extensive recruitment industry experience."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/10 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-bold text-blue-700 rounded-full border border-blue-100 bg-white">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            Got <span className="text-blue-700">Questions?</span> We've Got Answers
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Find answers to common questions about our platform, accessibility features, and how we can help you find your dream job or ideal candidate.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-5 md:space-y-7">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`border border-gray-200 rounded-xl overflow-hidden bg-white transition-shadow ${activeIndex === index ? 'shadow-md' : 'shadow-sm'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full p-6 md:p-7 text-left transition-colors hover:bg-gray-50"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{faq.question}</h3>
                  <div className={`flex-shrink-0 ml-4 p-1 rounded-full bg-gray-100 border border-gray-200 ${activeIndex === index ? 'bg-blue-50 border-blue-100' : ''}`}>
                    {activeIndex === index ? 
                      <Minus className="w-5 h-5 text-blue-600" /> : 
                      <Plus className="w-5 h-5 text-gray-500" />
                    }
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      key={`answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7 border-t border-gray-100 pt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 text-center p-6 md:p-8 rounded-2xl bg-blue-50 border border-blue-100">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-base md:text-lg text-gray-700 mb-6 mx-auto max-w-2xl">
              If you cannot find answers to your questions in our FAQ, please don't hesitate to contact our support team.
            </p>
            <Link href="/contact">
              <button className="py-3 px-7 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 mx-auto">
                Contact Support
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
