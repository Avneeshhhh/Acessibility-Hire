"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does AI improve the recruitment process?",
    answer: "Our AI technology enhances recruitment by automating candidate screening, providing intelligent matching based on skills and experience, and offering predictive analytics for better hiring decisions. This results in faster placements and better candidate matches."
  },
  {
    question: "What makes Acessibility Hire different from other ATS platforms?",
    answer: "Acessibility Hire combines advanced AI capabilities with an intuitive user interface, offering features like automated candidate ranking, smart scheduling, and personalized communication workflows. Our platform is designed to be both powerful and easy to use."
  },
  {
    question: "Can I integrate Acessibility Hire with my existing HR tools?",
    answer: "Yes, Acessibility Hire offers seamless integration with popular HR tools and platforms. Our API-first approach allows for easy connection with your existing tech stack, including HRIS systems, job boards, and calendar applications."
  },
  {
    question: "How secure is my recruitment data with Acessibility Hire?",
    answer: "We prioritize data security with enterprise-grade encryption, regular security audits, and compliance with global data protection regulations including GDPR. Your data is stored in secure, redundant cloud infrastructure."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer comprehensive support including 24/7 technical assistance, dedicated account managers for enterprise clients, regular training sessions, and detailed documentation. Our support team has extensive recruitment industry experience."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 md:gap-4 mb-3"
          >
            <div className="h-[1px] w-6 md:w-8 bg-[#25272A]/30"></div>
            <span className="text-xs md:text-sm font-medium text-[#25272A] uppercase tracking-wider">FAQ</span>
            <div className="h-[1px] w-6 md:w-8 bg-[#25272A]/30"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 md:mb-3"
          >
            <span className="text-[#25272A]">Frequently</span>{' '}
            <span className="text-[#25272A]">Asked Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-[#6B7280] px-4"
          >
            Everything you need to know about our AI-powered recruitment platform
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className={`border-b border-gray-200 last:border-0 ${
                openIndex === index ? 'bg-[#F8F8F9]/50' : 'hover:bg-[#F8F8F9]'
              } rounded-lg transition-all duration-300`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full py-3 md:py-4 px-4 md:px-6 flex items-center justify-between gap-3 md:gap-4 text-left transition-all duration-300 ${
                  openIndex === index 
                    ? 'text-[#25272A]' 
                    : 'text-[#25272A] hover:text-[#404348]'
                }`}
              >
                <span className="text-sm md:text-base lg:text-lg font-display font-semibold">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 p-1 md:p-1.5 rounded-lg transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-[#F8F8F9] text-[#25272A]' 
                    : 'bg-[#F8F8F9] text-[#6B7280]'
                }`}>
                  {openIndex === index ? (
                    <Minus className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 md:px-6 pb-3 md:pb-4 text-[#6B7280] leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
