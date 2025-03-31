"use client";
import { useState, useEffect } from 'react';
import { createJobPost, getUserJobPosts, getUserOrganization } from '@/lib/firebase';
import { useAuth } from '@/lib/authContext';
import { Briefcase, MapPin, DollarSign, FileText, Calendar, PlusCircle, RefreshCw } from 'lucide-react';

const JobPostManager = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const fetchData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // First check if user has organization
      const orgResult = await getUserOrganization();
      
      if (orgResult.success && orgResult.organization) {
        setOrganization(orgResult.organization);
        
        // Then fetch job posts for this organization
        const jobsResult = await getUserJobPosts();
        
        if (jobsResult.success) {
          setJobPosts(jobsResult.jobPosts);
        } else if (jobsResult.error) {
          console.error("Error fetching job posts:", jobsResult.error);
          setError('Failed to load job posts. Please try again.');
        }
      } else {
        // User doesn't have an organization yet
        setOrganization(null);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!organization) {
      setError('You must create an organization before posting a job');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    // Form validation
    if (!title.trim()) {
      setError('Job title is required');
      setIsSubmitting(false);
      return;
    }
    
    if (!desc.trim()) {
      setError('Job description is required');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const { success, jobId, error } = await createJobPost({
        title,
        desc,
        location,
        salary
      });
      
      if (success) {
        setSuccess('Job posted successfully!');
        setShowForm(false);
        
        // Reset form
        setTitle('');
        setDesc('');
        setLocation('');
        setSalary('');
        
        // Refresh job posts
        fetchData();
      } else {
        console.error("Error creating job post:", error);
        setError(error?.message || 'Failed to create job post. Please try again.');
      }
    } catch (err) {
      console.error("Error creating job post:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading && !organization) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-2">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        <div className="text-center py-8">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Create an Organization First</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            You need to create an organization before you can post jobs. Go to the Organization tab to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {organization.org_name}'s Job Posts
        </h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => fetchData()}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center text-sm"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center text-sm"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Post a Job
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-100">
          {success}
        </div>
      )}
      
      {/* Job Post Form */}
      {showForm && (
        <div className="mb-8 border border-gray-200 rounded-xl p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Create New Job Post</h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Frontend Developer"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. Remote, New York, NY"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. $80,000 - $100,000"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <div className="relative rounded-md">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows="6"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the job requirements, responsibilities, and qualifications..."
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </>
                ) : (
                  "Post Job"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Job Posts List */}
      <div className="space-y-6">
        {jobPosts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Job Posts Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Your organization hasn't posted any jobs yet. Click "Post a Job" to create your first job listing.
            </p>
          </div>
        ) : (
          jobPosts.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {job.title}
                </h3>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {job.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      {job.location}
                    </div>
                  )}
                  
                  {job.salary && (
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
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
                      : 'Unknown date'}
                  </div>
                </div>
                
                <div className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {job.desc.length > 200 
                    ? `${job.desc.substring(0, 200)}...` 
                    : job.desc}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobPostManager; 