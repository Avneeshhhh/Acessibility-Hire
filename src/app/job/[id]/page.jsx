"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import Link from 'next/link';
import { getJobById } from '@/lib/firebase';
import { useAuth } from '@/lib/authContext';

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchJobDetails() {
      if (!id) {
        setError('Job ID is missing');
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError('');
      
      try {
        const { success, job, error } = await getJobById(id);
        
        if (success && job) {
          setJob(job);
        } else {
          setError(error || 'Failed to fetch job details');
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchJobDetails();
  }, [id]);

  const handleApply = () => {
    if (!job) return;
    
    if (!user && !job.contactLink) {
      router.push('/login?redirect=' + encodeURIComponent(`/job/${id}`));
      return;
    }
    
    // If there's a contact link, redirect to it
    if (job.contactLink) {
      const link = job.contactLink.startsWith('http') 
        ? job.contactLink 
        : job.contactLink.includes('@') 
          ? `mailto:${job.contactLink}` 
          : `https://${job.contactLink}`;
      window.open(link, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="flex space-x-4 mb-6">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-center">
                <Briefcase className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="mt-4 text-center text-xl font-semibold text-gray-900">Job Not Found</h2>
              <p className="mt-2 text-center text-gray-600">
                {error || 'This job posting may have been removed or is no longer available.'}
              </p>
              <div className="mt-6 text-center">
                <Link 
                  href="/jobs" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  Back to Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <Link 
          href="/jobs" 
          className="inline-flex items-center text-gray-600 font-medium hover:text-indigo-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back to jobs
        </Link>
        
        {/* Main Content */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-8">
          <div className="p-6 md:p-8">
            {/* Job Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>
              
              {job.organization && (
                <div className="flex items-center text-gray-700 mb-6">
                  <Building2 className="h-5 w-5 mr-2 text-gray-600" />
                  <span className="font-medium">{job.organization.org_name}</span>
                  
                  {job.organization.org_url && (
                    <Link 
                      href={job.organization.org_url.startsWith('http') ? job.organization.org_url : `https://${job.organization.org_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center text-indigo-600 text-sm hover:text-indigo-700"
                    >
                      Visit website <ExternalLink className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                {job.location && (
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-1.5 text-indigo-500" />
                    <span>{job.location}</span>
                  </div>
                )}
                
                {job.salary && (
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-1.5 text-green-500" />
                    <span>{job.salary}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-1.5 text-gray-500" />
                  <span>
                    {job.created_at instanceof Date
                      ? job.created_at.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Recently posted'}
                  </span>
                </div>
              </div>
              
              {/* Skills Section */}
              {job.skills && job.skills.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 mr-1.5 text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-700">Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-indigo-50 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-6 border-t border-gray-100">
                {/* Description stays below the border */}
              </div>
            </div>
            
            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Description
              </h2>
              
              <div className="prose prose-indigo max-w-none text-gray-700 whitespace-pre-wrap">
                {job.desc}
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-gray-100">
              <button
                onClick={handleApply}
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
              >
                <Briefcase className="h-5 w-5 mr-2" />
                {job.contactLink && job.contactLink.includes('@') 
                  ? 'Contact via Email'
                  : 'Apply for this position'}
              </button>
              
              <Link 
                href="/jobs" 
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
              >
                View more jobs
              </Link>
            </div>
          </div>
        </div>
        
        {/* Similar Jobs (placeholder) */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Similar Jobs
          </h2>
          
          <p className="text-gray-500">
            More job recommendations coming soon...
          </p>
        </div>
      </div>
    </div>
  );
} 