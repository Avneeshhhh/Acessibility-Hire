"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import NavBar from "@/components/custom/Navigation/NavBar";
import Footer from "@/components/custom/Navigation/Footer";
import ChatBotWrapper from "@/components/custom/Chatbot/ChatBotWrapper";
import Link from 'next/link';
import { ArrowLeft, Building, MapPin, Clock, DollarSign, Briefcase, Calendar, Share2, Bookmark, Flag, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.id;
  const { user } = useAuth();
  
  // This would typically fetch job data based on the ID
  // For now we'll use placeholder data
  const job = {
    id: jobId,
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "New York, USA",
    salary: "$120K - $145K per year",
    type: "Full-time",
    postedDate: "Posted 2 days ago",
    applications: 45,
    description: `
      <p>We are looking for a senior frontend developer to join our growing team of talented engineers.</p>
      
      <p>In this role, you will be responsible for building user interfaces for our web applications using modern frontend technologies. You'll work closely with designers, product managers, and backend developers to deliver exceptional user experiences.</p>
      
      <h4>Responsibilities:</h4>
      <ul>
        <li>Build responsive and accessible user interfaces</li>
        <li>Write clean, efficient, and maintainable code</li>
        <li>Collaborate with cross-functional teams</li>
        <li>Mentor junior developers</li>
        <li>Participate in code reviews</li>
      </ul>
      
      <h4>Requirements:</h4>
      <ul>
        <li>5+ years of experience with JavaScript and modern frontend frameworks</li>
        <li>Strong understanding of React, TypeScript, and state management</li>
        <li>Experience with responsive design and CSS preprocessors</li>
        <li>Knowledge of web accessibility standards</li>
        <li>Bachelor's degree in Computer Science or related field, or equivalent experience</li>
      </ul>
      
      <h4>Benefits:</h4>
      <ul>
        <li>Competitive salary and equity package</li>
        <li>Flexible work arrangements</li>
        <li>Health, dental, and vision insurance</li>
        <li>401(k) matching</li>
        <li>Professional development budget</li>
      </ul>
    `,
    companyDescription: "Tech Solutions Inc. is a leading technology company specializing in building innovative software solutions for enterprises. With a focus on accessibility and inclusion, we create products that empower users of all abilities.",
    skills: ["React", "TypeScript", "UI/UX", "JavaScript", "CSS", "HTML", "Responsive Design"],
    logo: "/images/placeholder/company-logo1.png",
  };

  // If no user is logged in, show login prompt
  if (!user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <NavBar />
        <div className="pt-16 py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Required</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to view job details. Please log in or sign up to continue.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/login" className="bg-blue-700 text-white px-5 py-2 rounded-lg font-medium">
                  Log In
                </Link>
                <Link href="/signup" className="border border-blue-600 text-blue-700 px-5 py-2 rounded-lg font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ChatBotWrapper />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <NavBar />
      <div className="pt-16 py-12">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/jobs" className="hover:text-blue-600 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Jobs
            </Link>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Job details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 overflow-hidden">
                      {job.logo && <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 object-contain" />}
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                      <div className="flex items-center text-gray-700 mt-2">
                        <Building className="w-4 h-4 mr-1" />
                        <span>{job.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>{job.postedDate}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">About {job.company}</h2>
                  <p className="text-gray-700">{job.companyDescription}</p>
                </div>

                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <button className="text-gray-600 hover:text-red-600 text-sm flex items-center">
                    <Flag className="w-4 h-4 mr-1" /> Report this job
                  </button>
                  <span className="text-sm text-gray-500">{job.applications} applications</span>
                </div>
              </div>
            </div>

            {/* Right column - Application and similar jobs */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this position</h3>
                <p className="text-gray-600 mb-6">Submit your application now and hear back within 5 business days</p>
                <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
                <div className="mt-4 text-center">
                  <span className="text-sm text-gray-500">or</span>
                </div>
                <button className="w-full mt-4 border border-blue-600 text-blue-700 hover:bg-blue-50 py-3 px-4 rounded-lg font-medium transition-colors">
                  Easy Apply with Resume
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  <div className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-medium text-gray-900">Frontend Developer</h4>
                    <p className="text-sm text-gray-600 mb-2">Creative Labs - Chicago, USA</p>
                    <p className="text-sm text-gray-700 mb-3">$90K - $110K per year</p>
                    <Link href="/jobs/2" className="text-blue-600 text-sm flex items-center hover:underline">
                      View Job <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="font-medium text-gray-900">Senior UI Engineer</h4>
                    <p className="text-sm text-gray-600 mb-2">Innovate Digital - Remote</p>
                    <p className="text-sm text-gray-700 mb-3">$115K - $140K per year</p>
                    <Link href="/jobs/3" className="text-blue-600 text-sm flex items-center hover:underline">
                      View Job <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
                <Link href="/jobs" className="mt-4 block text-center text-blue-600 hover:underline text-sm">
                  Browse all jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBotWrapper />
    </main>
  );
} 