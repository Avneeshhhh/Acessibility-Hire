"use client";
import React from 'react';
import Image from 'next/image';
import { Star, Building, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "HR Manager",
    company: "TechFusion Inc.",
    content: "Implementing Accessibility Hire has transformed our recruitment process. We've seen a 40% increase in qualified candidates with disabilities applying to our positions.",
    image: "/images/testimonials/sarah.jpg",
    rating: 5,
    date: "June 15, 2023"
  },
  {
    name: "David Chen",
    position: "Software Engineer",
    company: "Innovate Solutions",
    content: "I found my dream job through this platform. The personalized job matches and accessibility-focused employers made all the difference in my job search.",
    image: "/images/testimonials/david.jpg",
    rating: 5,
    date: "July 28, 2023"
  },
  {
    name: "Maria Rodriguez",
    position: "Marketing Specialist",
    company: "Global Media Group",
    content: "As someone with ADHD, finding an inclusive employer was crucial. This platform connected me with companies that understand and accommodate diverse work styles.",
    image: "/images/testimonials/maria.jpg",
    rating: 4,
    date: "August 4, 2023"
  },
  {
    name: "James Wilson",
    position: "Project Manager",
    company: "BuildRight Construction",
    content: "The resources and support provided by Accessibility Hire have been invaluable. Their team helped us implement inclusive hiring practices that benefit our entire organization.",
    image: "/images/testimonials/james.jpg",
    rating: 5,
    date: "May 12, 2023"
  },
  {
    name: "Aisha Patel",
    position: "UX Designer",
    company: "Creative Digital",
    content: "The platform's focus on skills rather than limitations helped me showcase my abilities. I'm now working at a company that values my unique perspective.",
    image: "/images/testimonials/aisha.jpg",
    rating: 5,
    date: "September 3, 2023"
  },
  {
    name: "Robert Thompson",
    position: "Director of Diversity & Inclusion",
    company: "Enterprise Solutions",
    content: "The data and insights provided by Accessibility Hire have helped us measure and improve our diversity hiring initiatives with meaningful metrics.",
    image: "/images/testimonials/robert.jpg",
    rating: 4,
    date: "July 5, 2023"
  }
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl p-7 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-gray-200">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill={i < testimonial.rating ? "currentColor" : "none"} />
          ))}
        </div>
      </div>
      
      <blockquote className="text-base md:text-lg text-gray-700 mb-6 flex-grow">
        "{testimonial.content}"
      </blockquote>
      
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <p className="text-sm text-gray-500">{testimonial.date}</p>
        {testimonial.company && (
          <div className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">{testimonial.company}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/10 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      </div>
      
      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-sm font-bold text-gray-900 rounded-full border border-gray-200 bg-white shadow-sm">
            <MessageSquare className="w-4 h-4 text-gray-700" />
            <span>TESTIMONIALS</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900">
            What Our <span className="text-gray-800">Community</span> Says
          </h2>
          
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Hear from professionals who have found their ideal roles and employers who have connected with exceptional talent.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

