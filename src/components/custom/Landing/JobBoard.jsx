"use client";
import React, { useState } from 'react';
import { Search, MapPin, Building, Briefcase, Calendar, ChevronRight, Star, Filter, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "New York, USA",
    salary: "$120K/yr",
    type: "Full-time",
    postedDays: 2,
    applications: 45,
    skills: ["React", "TypeScript", "UI/UX"],
    rating: 4.8,
    reviews: 120,
    logo: "/images/placeholder/company-logo1.png",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Innovate Digital",
    location: "Los Angeles, USA",
    salary: "$115K/yr",
    type: "Full-time",
    postedDays: 3,
    applications: 78,
    skills: ["Agile", "Product Strategy", "User Research"],
    rating: 4.6,
    reviews: 86,
    logo: "/images/placeholder/company-logo2.png",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Labs",
    location: "Chicago, USA",
    salary: "$95K/yr",
    type: "Remote",
    postedDays: 1,
    applications: 32,
    skills: ["Figma", "User Testing", "Design Systems"],
    rating: 4.9,
    reviews: 152,
    logo: "/images/placeholder/company-logo3.png",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "San Diego, USA",
    salary: "$130K/yr",
    type: "Hybrid",
    postedDays: 5,
    applications: 64,
    skills: ["Python", "Machine Learning", "Data Visualization"],
    rating: 4.7,
    reviews: 94,
    logo: "/images/placeholder/company-logo4.png",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "Cloud Systems",
    location: "Houston, USA",
    salary: "$125K/yr",
    type: "Full-time",
    postedDays: 4,
    applications: 51,
    skills: ["Node.js", "AWS", "Databases"],
    rating: 4.5,
    reviews: 78,
    logo: "/images/placeholder/company-logo5.png",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "Growth Partners",
    location: "Philadelphia, USA",
    salary: "$85K/yr",
    type: "Contract",
    postedDays: 7,
    applications: 38,
    skills: ["Digital Marketing", "SEO", "Content Strategy"],
    rating: 4.3,
    reviews: 62,
    logo: "/images/placeholder/company-logo6.png",
  }
];

const JobBoard = () => {
  const [selectedJobType, setSelectedJobType] = useState("All types");
  const [selectedLocation, setSelectedLocation] = useState("All Cities");
  const [selectedExperience, setSelectedExperience] = useState("All levels");
  const [selectedSalary, setSelectedSalary] = useState("Any");

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 max-w-[1920px]">
        {/* Filters
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-500 mb-1">Type of job</label>
              <select 
                className="w-full h-12 pl-3 pr-10 text-base border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              >
                <option>All types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
              <select 
                className="w-full h-12 pl-3 pr-10 text-base border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option>All Cities</option>
                <option>New York, USA</option>
                <option>Los Angeles, USA</option>
                <option>Chicago, USA</option>
                <option>San Diego, USA</option>
                <option>Houston, USA</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-500 mb-1">Experience</label>
              <select 
                className="w-full h-12 pl-3 pr-10 text-base border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                <option>All levels</option>
                <option>Entry-level</option>
                <option>Mid-level</option>
                <option>Senior</option>
                <option>Executive</option>
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-500 mb-1">Salary</label>
              <select 
                className="w-full h-12 pl-3 pr-10 text-base border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={selectedSalary}
                onChange={(e) => setSelectedSalary(e.target.value)}
              >
                <option>Any</option>
                <option>$50K+</option>
                <option>$75K+</option>
                <option>$100K+</option>
                <option>$150K+</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button className="h-12 px-6 flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div> */}

        {/* Job listings */}
        <div className="mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-900">Recommended Positions</h3>
              </div>
              <p className="text-gray-500 text-sm ml-4 mt-1">Curated opportunities matching your professional profile</p>
            </div>
            <div className="flex items-center ml-4 md:ml-0">
              <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium text-sm rounded-full border border-blue-100 shadow-sm mr-3">
                24 positions
              </span>
              <Link href="/jobs" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 text-sm bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm hover:shadow-md transition-all">
                View all jobs <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <div key={job.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 relative flex flex-col p-6">
                {/* Top row with company name and rating */}
                <div className="flex justify-between items-center mb-5">
                  <div className="text-gray-800 font-medium flex items-center">
                    {job.logo && (
                      <div className="w-8 h-8 rounded-md overflow-hidden mr-2.5 border border-gray-100">
                        <Image 
                          src={job.logo} 
                          alt={`${job.company} logo`} 
                          width={32} 
                          height={32} 
                          className="object-contain"
                        />
                      </div>
                    )}
                    {job.company}
                  </div>
                  <div className="flex items-center gap-1">
                    {job.rating >= 4.7 && (
                      <div className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-medium rounded-full mr-1.5 shadow-sm">
                        Featured
                      </div>
                    )}
                    <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-medium ml-1">{job.rating}</span>
                      <span className="text-xs text-gray-500 ml-0.5">({job.reviews})</span>
                    </div>
                  </div>
                </div>
                
                {/* Job title as main focal point */}
                <h3 className="text-xl font-bold text-blue-600 mb-3 group-hover:text-blue-700 transition-colors">{job.title}</h3>
                
                {/* Company info */}
                <div className="flex items-center gap-1.5 text-gray-600 mb-4">
                  <Building className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{job.company}</span>
                </div>
                
                {/* Job details in horizontal rows */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-50">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-50">
                      <DollarSign className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-50">
                      <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-amber-50">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <span className="text-sm text-gray-600">{job.applications} applied</span>
                  </div>
                </div>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-100/30">
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* View Details button with improved styling */}
                <div className="mt-auto pt-3 flex">
                  <Link href={`/jobs/${job.id}`} className="w-full">
                    <button className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow">
                      View Details
                    </button>
                  </Link>
                  <button className="flex items-center justify-center w-11 h-11 ml-2 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 group">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 group-hover:text-blue-500 transition-colors">
                      <path d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobBoard; 