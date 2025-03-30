"use client";
import React, { useState } from 'react';
import { Star, Building, MapPin, Clock, ChevronRight, Bookmark, BookmarkCheck, DollarSign, BriefcaseBusiness, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample personalized job data
const recommendedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "New York, USA",
    salary: "$120K/yr",
    matchPercentage: 95,
    postedDays: 2,
    skills: ["React", "TypeScript", "UI/UX"],
    logo: "/images/placeholder/company-logo1.png",
    saved: false
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Labs",
    location: "Chicago, USA",
    salary: "$95K/yr",
    matchPercentage: 92,
    postedDays: 1,
    skills: ["Figma", "User Testing", "Design Systems"],
    logo: "/images/placeholder/company-logo3.png",
    saved: true
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "Cloud Systems",
    location: "Remote",
    salary: "$125K/yr",
    matchPercentage: 89,
    postedDays: 4,
    skills: ["Node.js", "AWS", "Databases"],
    logo: "/images/placeholder/company-logo5.png",
    saved: false
  }
];

const ProfileJobBoard = () => {
  const [savedJobs, setSavedJobs] = useState(
    recommendedJobs.map(job => ({ ...job, saved: job.saved }))
  );

  const toggleSaveJob = (jobId) => {
    setSavedJobs(
      savedJobs.map(job => 
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden mt-8 border border-gray-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="border-b border-gray-200/80">
        <div className="px-6 py-6 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-indigo-100/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Recommended Jobs
            </h2>
            <p className="text-sm text-gray-600 mt-1.5">
              Personalized matches based on your skills and preferences
            </p>
          </div>
          <Link 
            href="/jobs" 
            className="group text-sm text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1 bg-white/70 hover:bg-white px-4 py-2 rounded-full shadow-sm transition-all hover:shadow"
          >
            View all jobs <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      <motion.div className="divide-y divide-gray-100/70" variants={containerVariants}>
        {savedJobs.map((job, index) => (
          <motion.div 
            key={job.id} 
            variants={itemVariants}
            className="p-6 hover:bg-indigo-50/40 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1, duration: 0.4 }
            }}
          >
            <div className="flex justify-between">
              <div className="flex gap-4">
                {/* Company logo */}
                <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 p-2">
                  {job.logo ? (
                    <Image 
                      src={job.logo} 
                      alt={`${job.company} logo`} 
                      width={48} 
                      height={48} 
                      className="object-contain"
                    />
                  ) : (
                    <Building className="w-7 h-7 text-gray-400" />
                  )}
                </div>

                {/* Job details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between w-full">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-700 transition-colors">
                      <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                    </h3>
                    <div className="mt-1.5 sm:mt-0 flex items-center">
                      <div className="relative flex items-center">
                        <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-80 blur-sm rounded-full"></span>
                        <span className="relative bg-gradient-to-r from-indigo-500 to-indigo-700 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center shadow-sm">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          {job.matchPercentage}% Match
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-700 text-sm mt-1.5">
                    <Building className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
                    <span className="font-medium">{job.company}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4 mt-3">
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-50/80 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-indigo-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-50/80 px-2.5 py-1 rounded-md">
                      <DollarSign className="w-3.5 h-3.5 flex-shrink-0 text-green-500" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 text-sm bg-gray-50/80 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0 text-amber-500" />
                      <span>{job.postedDays} days ago</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="ml-4 flex flex-col gap-2">
                <motion.button 
                  onClick={() => toggleSaveJob(job.id)}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-full 
                    ${job.saved 
                      ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }
                    transition-all duration-200
                  `}
                  aria-label={job.saved ? "Unsave job" : "Save job"}
                >
                  {job.saved ? 
                    <BookmarkCheck className="w-5 h-5" /> : 
                    <Bookmark className="w-5 h-5" />
                  }
                </motion.button>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4 items-center">
              <div className="flex items-center bg-indigo-50/60 px-3 py-1.5 rounded-lg">
                <BriefcaseBusiness className="w-4 h-4 text-indigo-600 mr-1.5" />
                <span className="text-sm text-gray-700">Apply with 1-click using your saved resume</span>
              </div>
              
              <Link href={`/jobs/${job.id}`}>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow"
                >
                  View Job
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-gray-200/50">
        <Link 
          href="/profile/preferences" 
          className="text-sm text-gray-700 hover:text-indigo-700 flex items-center justify-center gap-1 transition-colors"
        >
          Update your job preferences to improve matches
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProfileJobBoard; 