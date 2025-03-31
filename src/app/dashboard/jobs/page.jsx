"use client";
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Building, MapPin, Clock, Users, 
  Trash2, Edit, Plus, Calendar, Search, Loader,
  AlertTriangle, Filter, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { getJobsByUser, deleteJob } from '@/lib/jobService';

const JobsDashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [filterJobType, setFilterJobType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Job types for filter
  const jobTypes = [
    { value: '', label: 'All Types' },
    { value: 'full-time', label: 'Full-Time' },
    { value: 'part-time', label: 'Part-Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];

  // Load jobs posted by current user
  useEffect(() => {
    const fetchJobs = async () => {
      if (authLoading) return;
      
      // Redirect if not logged in
      if (!user) {
        router.push('/login');
        return;
      }
      
      try {
        setLoading(true);
        const userJobs = await getJobsByUser(user.uid);
        setJobs(userJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load your job listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user, authLoading, router]);
  
  // Handle job deletion
  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      
      // Update jobs list
      setJobs(jobs.filter(job => job.id !== jobId));
      
      // Reset confirmation
      setDeleteConfirmation(null);
    } catch (err) {
      console.error('Error deleting job:', err);
      setError('Failed to delete job. Please try again.');
    }
  };
  
  // Filter and search jobs
  const filteredJobs = jobs
    .filter(job => {
      // Filter by job type
      if (filterJobType && job.jobType !== filterJobType) {
        return false;
      }
      
      // Filter by search query (case insensitive)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 30) {
      return formatDate(dateString);
    } else if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-gray-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Your Job Listings
          </h1>
          
          <Link 
            href="/dashboard/jobs/post"
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Post New Job
          </Link>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Search job title, company, location..."
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white rounded-md text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="filterJobType" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Type
                  </label>
                  <select
                    id="filterJobType"
                    value={filterJobType}
                    onChange={(e) => setFilterJobType(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  >
                    {jobTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {/* Jobs list */}
        {loading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Loader className="h-8 w-8 animate-spin text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600">Loading your job listings...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No job listings found</h2>
            <p className="text-gray-600 mb-6">
              {jobs.length === 0
                ? "You haven't posted any jobs yet."
                : "No jobs match your search criteria."
              }
            </p>
            {jobs.length === 0 && (
              <Link 
                href="/dashboard/jobs/post"
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Post Your First Job
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y divide-gray-200">
              {filteredJobs.map(job => (
                <div key={job.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h2>
                      <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-2">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row md:items-center">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Link>
                      <Link
                        href={`/dashboard/jobs/edit/${job.id}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteConfirmation(job.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm bg-red-50 text-red-700 rounded-md hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Posted: {formatTimeAgo(job.createdAt)}</span>
                    </div>
                    
                    {job.applicationDeadline && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Deadline: {formatDate(job.applicationDeadline)}</span>
                      </div>
                    )}
                    
                    {job.salaryMin && job.salaryMax && (
                      <div className="flex items-center">
                        <span>
                          Salary: {job.salaryCurrency} {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()} {job.salaryPeriod}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Accessibility: {job.isAccessible ? "Accessible" : "Not specified"}</span>
                    </div>
                  </div>
                  
                  {/* Delete confirmation modal */}
                  {deleteConfirmation === job.id && (
                    <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-lg">
                      <p className="text-red-700 mb-4">Are you sure you want to delete this job? This action cannot be undone.</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirmation(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsDashboardPage; 