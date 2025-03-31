"use client";

import React, { useEffect, useState } from 'react';
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import { motion } from 'framer-motion';
import { Briefcase, Search, MapPin, Filter, DollarSign, Clock, Building2, X } from 'lucide-react';
import { getAllJobPosts } from '@/lib/firebase';
import Link from 'next/link';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    showFilters: false
  });

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

  // Filter jobs based on search term and other filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.desc && job.desc.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.organization?.org_name && job.organization.org_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = filters.location === '' || 
      (job.location && job.location.toLowerCase().includes(filters.location.toLowerCase()));
    
    return matchesSearch && matchesLocation;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      location: '',
      showFilters: false
    });
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm !== '' || filters.location !== '';

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-black pt-16 pb-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mt-6 mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-gray-200 text-xl mb-8 max-w-2xl">
              Browse through opportunities tailored for people with accessibility needs
            </p>
            
            {/* Search Section */}
            <div className="relative w-full max-w-2xl">
              <div className="flex items-center">
                {/* Search Bar */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-12 py-3 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md text-gray-900"
                    placeholder="Search job title, company, or skills..."
                  />
                  {searchTerm && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Filter Toggle */}
                <button 
                  onClick={() => setFilters(prev => ({ ...prev, showFilters: !prev.showFilters }))}
                  className="flex items-center justify-center text-sm font-medium text-white bg-gray-900 ml-2 px-4 py-3 rounded-full hover:bg-black transition-colors"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">
                    {filters.showFilters ? 'Hide' : 'Filters'}
                  </span>
                </button>
              </div>
              
              {/* Filter Options */}
              {filters.showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 px-4 sm:px-0 bg-white/10 backdrop-blur-sm p-4 rounded-lg"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
                        Location
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-300" />
                        </div>
                        <input
                          type="text"
                          value={filters.location}
                          onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                          className="block w-full pl-10 py-2 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white/10 text-white placeholder-gray-300 text-sm"
                          placeholder="Remote, City, State..."
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with job count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
              {!isLoading && !error ? filteredJobs.length : "0"} Jobs Available
            </h2>
            
            {hasActiveFilters && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Filters applied</span>
                <button
                  onClick={clearFilters}
                  className="underline text-gray-900 hover:text-gray-600"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border-l-4 border-red-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
                    </div>
                    <div className="h-6 w-20 bg-amber-100 rounded-md"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-40 mb-4"></div>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    <div className="h-7 w-16 bg-gray-100 rounded-full"></div>
                    <div className="h-7 w-24 bg-gray-100 rounded-full"></div>
                    <div className="h-7 w-16 bg-gray-100 rounded-full"></div>
                  </div>
                  <div className="h-9 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <div className="text-sm text-gray-700 mb-1">
                        {job.organization?.org_name || 'Tech Solutio Inc.'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {job.title || 'Senior Frontend Developer'}
                      </h3>
                    </div>
                    {index % 3 === 0 && (
                      <div className="bg-amber-500 text-white text-xs font-medium px-2.5 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{job.organization?.org_name || 'Tech Solutions Inc.'}</span>
                    </div>
                  </div>
                  
                  <div className="flex mb-1">
                    <div className="flex items-center mr-6">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{job.location || 'New York, USA'}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{job.salary || '$120K/yr'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <Briefcase className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{job.job_type || 'Full-time'}</span>
                    
                    {job.posted && (
                      <div className="flex items-center ml-6">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700">{`${Math.floor(Math.random() * 7) + 1}d ago`}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {['React', 'TypeScript', 'UI/UX'].slice(0, 3).map((skill, i) => (
                      <span 
                        key={i}
                        className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/job/${job.id}`}
                    className="block w-full bg-gray-900 hover:bg-black text-white text-center font-medium py-2 rounded transition-colors"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <Briefcase className="h-14 w-14 text-gray-300 mx-auto mb-5" />
              <h3 className="text-xl font-medium text-gray-700 mb-3">No Jobs Found</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {hasActiveFilters 
                  ? "We couldn't find any jobs matching your search criteria. Try adjusting your filters."
                  : "There are no job listings available at the moment. Please check back later."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-lg shadow-sm text-sm font-medium transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
      <ChatBotWrapper />
    </div>
  );
} 