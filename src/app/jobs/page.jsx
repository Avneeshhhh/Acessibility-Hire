"use client";

import React, { useEffect, useState } from 'react';
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";
import ClientJobBoardSection from "@/components/custom/Landing/ClientJobBoardSection";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import { motion } from 'framer-motion';
import { Briefcase, Search, MapPin, Filter, ArrowRight, DollarSign, Calendar, Building2, X } from 'lucide-react';
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
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 pt-20 pb-24 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl">
            Browse through our curated list of job opportunities for people with accessibility needs
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-900 shadow-md"
              placeholder="Search jobs by title, description, or company..."
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          
          {/* Advanced Filters */}
          <div className="mt-4 flex">
            <button 
              onClick={() => setFilters(prev => ({ ...prev, showFilters: !prev.showFilters }))}
              className="flex items-center text-sm font-medium text-white bg-indigo-700/40 px-3 py-1.5 rounded-lg hover:bg-indigo-700/60"
            >
              <Filter className="h-4 w-4 mr-1.5" />
              {filters.showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="flex items-center text-sm font-medium text-white bg-indigo-700/40 px-3 py-1.5 rounded-lg hover:bg-indigo-700/60 ml-2"
              >
                <X className="h-4 w-4 mr-1.5" />
                Clear Filters
              </button>
            )}
          </div>
          
          {/* Filter Options */}
          {filters.showFilters && (
            <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg inline-flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-indigo-100 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="block w-full px-3 py-2 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/90 text-gray-900 text-sm"
                  placeholder="Remote, City, State..."
                />
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with job count */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {!isLoading && !error && `${filteredJobs.length} ${filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available`}
          </h2>
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
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map(job => (
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
              {hasActiveFilters 
                ? "We couldn't find any jobs matching your search criteria. Try adjusting your filters."
                : "There are no job listings available at the moment. Please check back later."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm text-sm font-medium"
              >
                <X className="h-4 w-4 mr-1.5" />
                Clear Filters
              </button>
            )}
          </div>
        )}
      </section>
      
      <Footer />
      <ChatBotWrapper />
    </div>
  );
} 