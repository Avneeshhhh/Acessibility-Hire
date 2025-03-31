"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Briefcase, MapPin, DollarSign, Calendar, Building2, ArrowLeft, ExternalLink } from 'lucide-react';
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
  const [applicationStatus, setApplicationStatus] = useState('not_applied');

  useEffect(() => {
    async function fetchJobDetails() {
      if (!id) return;
      
      setIsLoading(true);
      setError('');
      
      try {
        const { success, job, error } = await getJobById(id);
        
        if (success && job) {
          setJob(job);
          
          // Check if user has already applied
          // This would ideally be implemented in your backend
          // For now, just simulating a status
          setApplicationStatus('not_applied');
          
        } else {
          throw new Error(error || 'Failed to fetch job details');
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

  const handleApply = async () => {
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(`/job/${id}`));
      return;
    }
    
    setApplicationStatus('submitting');
    
    // Simulate application submission
    setTimeout(() => {
      setApplicationStatus('applied');
    }, 1500);
    
    // In a real app, you would submit to your backend:
    // await applyToJob(id, user.uid);
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
          <div className="bg-red-50 text-red-700 p-6 rounded-xl mb-6 border border-red-100">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error || 'Job not found'}</p>
            <Link 
              href="/" 
              className="mt-4 inline-flex items-center text-red-700 font-medium hover:text-red-800"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back to jobs
            </Link>
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
          href="/" 
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
              
              <div className="flex flex-wrap gap-4 pb-6 border-b border-gray-100">
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
              {applicationStatus === 'not_applied' ? (
                <button
                  onClick={handleApply}
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
                >
                  <Briefcase className="h-5 w-5 mr-2" />
                  Apply for this position
                </button>
              ) : applicationStatus === 'submitting' ? (
                <button
                  disabled
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg shadow-sm opacity-80 cursor-not-allowed"
                >
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Applying...
                </button>
              ) : (
                <div className="inline-flex items-center px-6 py-3 bg-green-50 text-green-700 font-medium rounded-lg">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Application Submitted
                </div>
              )}
              
              <Link 
                href="/" 
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