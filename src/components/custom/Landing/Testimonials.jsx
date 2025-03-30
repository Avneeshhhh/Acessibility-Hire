"use client";
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Chen",
    position: "HR Director",
    company: "TechCorp Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "Accessibility Hire has revolutionized our hiring process. We've reduced our time-to-hire by 75% while finding better-qualified candidates.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    position: "Talent Acquisition Lead",
    company: "InnovateX",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "The AI-powered screening is a game-changer. It's like having an expert recruiter working 24/7. Absolutely worth the investment.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    position: "Recruitment Manager",
    company: "Global Solutions",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    content: "We've seen a significant improvement in candidate quality since using Accessibility Hire. The AI matching is incredibly accurate.",
    rating: 5
  },
  {
    name: "David Kim",
    position: "Head of Talent",
    company: "Future Tech",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    content: "The platform's AI capabilities have transformed how we evaluate candidates. Our hiring success rate has increased dramatically.",
    rating: 5
  },
  {
    name: "Lisa Anderson",
    position: "HR Manager",
    company: "Digital Dynamics",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    content: "Exceptional tool for modern recruitment. The AI insights have helped us make better hiring decisions consistently.",
    rating: 5
  },
  // Duplicate testimonials for continuous scroll
  {
    name: "Sarah Chen",
    position: "HR Director",
    company: "TechCorp Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    content: "Accessibility Hire has revolutionized our hiring process. We've reduced our time-to-hire by 75% while finding better-qualified candidates.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    position: "Talent Acquisition Lead",
    company: "InnovateX",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    content: "The AI-powered screening is a game-changer. It's like having an expert recruiter working 24/7. Absolutely worth the investment.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group min-w-[380px] max-w-[380px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
           style={{ 
             background: `linear-gradient(to bottom right, 
               ${index % 3 === 0 ? 'from-blue-500/20 to-violet-500/20' : 
                 index % 3 === 1 ? 'from-violet-500/20 to-purple-500/20' : 
                 'from-purple-500/20 to-blue-500/20'})` 
           }}
      />
      <div className="relative p-6 bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Rating Stars */}
        <div className="flex mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>

        {/* Testimonial Content */}
        <p className="text-gray-700 mb-6 text-base leading-relaxed break-words whitespace-normal">
          "{testimonial.content}"
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
            <p className="text-sm text-blue-600">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f1_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f1_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-gradient-to-r from-blue-600 to-violet-600 mb-4 mx-auto"
          />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 text-center"
          >
            Join hundreds of companies that trust Accessibility Hire to transform their recruitment process
          </motion.p>
        </div>

        {/* Testimonials Horizontal Scroll */}
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrolling Container */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex gap-8 whitespace-normal"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                testimonial={testimonial} 
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
