"use client";
import { useState, useEffect } from 'react';
import { getAllJobPosts } from '@/lib/firebase';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, Search, X, Filter } from 'lucide-react';
import Link from 'next/link';
import HeroSection from "@/components/custom/Landing/HeroSection";
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import ATSFor from "@/components/custom/Landing/ATSFor";
import About from "@/components/custom/Landing/About";
import CareerNetwork from "@/components/custom/Landing/CareerNetwork";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      setError('');
      
      try {
        const { success, jobPosts, error } = await getAllJobPosts();
        
        if (success) {
          setJobs(jobPosts);
        } else {
          throw new Error(error || 'Failed to fetch job listings');
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchJobs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <HeroSection />
      <CareerNetwork />
      <ATSFor />
      <About />
      
      {/* Featured Job Listings Section */}
      <section id="job-listings" className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find the Perfect Job for Your Skills
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Browse through our curated list of job opportunities for people with accessibility needs
          </p>
          
          <div className="mt-8">
            <Link 
              href="/jobs" 
              className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Job Preview Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Featured Opportunities
          </h2>
          <Link 
            href="/jobs" 
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View all jobs
          </Link>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-100">
            {error}
          </div>
        )}
        
        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex space-x-4 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {/* Only show first 3 jobs on homepage */}
            {jobs.slice(0, 3).map(job => (
              <Link 
                href={`/job/${job.id}`} 
                key={job.id}
                className="block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {job.title}
                      </h3>
                      
                      {job.organization && (
                        <div className="flex items-center text-gray-600 mb-4">
                          <Building2 className="h-4 w-4 mr-1.5 text-gray-500" />
                          <span>{job.organization.org_name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    {job.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1 text-indigo-500" />
                        {job.location}
                      </div>
                    )}
                    
                    {job.salary && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                        {job.salary}
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      {job.created_at instanceof Date
                        ? job.created_at.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : 'Recently posted'}
                    </div>
                  </div>
                  
                  <div className="text-gray-700 line-clamp-3 mb-4">
                    {job.desc}
                  </div>
                  
                  <div className="flex justify-end">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium">
                      <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Jobs Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              There are no job listings available at the moment. Please check back later.
            </p>
          </div>
        )}
      </section>
      
      <Footer />
      <ChatBotWrapper />
    </div>
  );
}
