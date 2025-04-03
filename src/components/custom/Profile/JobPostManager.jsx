"use client";
import { useState, useEffect } from 'react';
import { createJobPost, getUserJobPosts, getUserOrganization, deleteJobPost, updateJobPost } from '@/lib/firebase';
import { useAuth } from '@/lib/authContext';
import { Briefcase, MapPin, DollarSign, FileText, Calendar, PlusCircle, RefreshCw, Link as LinkIcon, Tag, Clock, Building2, ChevronLeft, ChevronRight, ExternalLink, Edit2, Trash2, AlertTriangle, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const JobPostManager = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [jobPosts, setJobPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState('');
  const [contactLink, setContactLink] = useState('');

  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, jobId: null });

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

  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobPosts.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobPosts.length / jobsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Get page range for pagination
  const getPageRange = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    
    if (totalPages <= 5) {
      return pageNumbers;
    }
    
    let range = [];
    if (currentPage <= 3) {
      range = [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      range = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      range = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }
    
    return range.filter(p => p > 0 && p <= totalPages);
  };

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
    
    // Parse skills from comma-separated list to array
    const skillsArray = skills.trim() 
      ? skills.split(',').map(skill => skill.trim()).filter(Boolean)
      : [];
    
    try {
      const { success, jobId, error } = await createJobPost({
        title,
        desc,
        location,
        salary,
        skills: skillsArray,
        contactLink
      });
      
      if (success) {
        // Create a new job object with the current data
        const newJob = {
          id: jobId,
          title,
          desc,
          location,
          salary,
          skills: skillsArray,
          contactLink,
          created_at: new Date(),
          organization,
          userId: user.uid
        };
        
        // Update the local state immediately
        setJobPosts(prevJobs => [newJob, ...prevJobs]);
        
        setSuccess('Job posted successfully!');
        setShowForm(false);
        
        // Reset form
        setTitle('');
        setDesc('');
        setLocation('');
        setSalary('');
        setSkills('');
        setContactLink('');
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

  const handleDeleteJob = async (jobId) => {
    try {
      const { success, error } = await deleteJobPost(jobId);
      
      if (success) {
        // Update local state immediately
        setJobPosts(prevJobs => prevJobs.filter(job => job.id !== jobId));
        setSuccess('Job post deleted successfully!');
      } else {
        setError(error || 'Failed to delete job post');
      }
    } catch (err) {
      console.error("Error deleting job post:", err);
      setError('An unexpected error occurred while deleting the job post');
    } finally {
      setDeleteConfirmation({ show: false, jobId: null });
    }
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setTitle(job.title);
    setDesc(job.desc);
    setLocation(job.location);
    setSalary(job.salary);
    setSkills(job.skills.join(', '));
    setContactLink(job.contactLink);
    setShowForm(true);
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    
    if (!editingJob) return;
    
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
    
    // Parse skills from comma-separated list to array
    const skillsArray = skills.trim() 
      ? skills.split(',').map(skill => skill.trim()).filter(Boolean)
      : [];
    
    try {
      const { success, error } = await updateJobPost(editingJob.id, {
        title,
        desc,
        location,
        salary,
        skills: skillsArray,
        contactLink
      });
      
      if (success) {
        // Create updated job object
        const updatedJob = {
          ...editingJob,
          title,
          desc,
          location,
          salary,
          skills: skillsArray,
          contactLink,
          updated_at: new Date()
        };
        
        // Update local state immediately
        setJobPosts(prevJobs => 
          prevJobs.map(job => 
            job.id === editingJob.id ? updatedJob : job
          )
        );
        
        setSuccess('Job post updated successfully!');
        setShowForm(false);
        setEditingJob(null);
        
        // Reset form
        setTitle('');
        setDesc('');
        setLocation('');
        setSalary('');
        setSkills('');
        setContactLink('');
      } else {
        setError(error || 'Failed to update job post');
      }
    } catch (err) {
      console.error("Error updating job post:", err);
      setError('An unexpected error occurred while updating the job post');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };
  
  if (isLoading && !organization) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-5 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
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
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {organization.org_name}'s Job Posts
          </h2>
          {jobPosts.length > 0 && (
            <p className="text-gray-500 text-sm">
              {jobPosts.length} {jobPosts.length === 1 ? 'job' : 'jobs'} posted
              {jobPosts.length > jobsPerPage && ` (Showing ${indexOfFirstJob + 1}-${Math.min(indexOfLastJob, jobPosts.length)} of ${jobPosts.length})`}
            </p>
          )}
        </div>
        
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
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editingJob ? 'Edit Job Post' : 'Create New Job Post'}
          </h3>
          
          <form onSubmit={editingJob ? handleUpdateJob : handleSubmit} className="space-y-5">
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
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills (comma separated)
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. React, JavaScript, Node.js"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contactLink" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Link
              </label>
              <div className="relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="contactLink"
                  value={contactLink}
                  onChange={(e) => setContactLink(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g. https://company.com/apply or email@example.com"
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
                  placeholder="Enter a detailed job description"
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingJob(null);
                  // Reset form
                  setTitle('');
                  setDesc('');
                  setLocation('');
                  setSalary('');
                  setSkills('');
                  setContactLink('');
                }}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (editingJob ? 'Updating...' : 'Posting...') : (editingJob ? 'Update Job' : 'Post Job')}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Job Posts List */}
      {jobPosts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl bg-gray-50">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Job Posts Yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Your organization hasn't posted any jobs yet. Click "Post a Job" to create your first job listing.
          </p>
        </div>
      ) : (
        <>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {currentJobs.map((job, index) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="text-sm text-gray-700 mb-1">
                      {organization.org_name}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditJob(job)}
                      className="p-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                      title="Edit job post"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmation({ show: true, jobId: job.id })}
                      className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete job post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap mb-1">
                  {job.location && (
                    <div className="flex items-center mr-6 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{job.location}</span>
                    </div>
                  )}
                  
                  {job.salary && (
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700">{job.salary}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center mb-3">
                  <Clock className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-700">
                    {job.created_at instanceof Date
                      ? new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
                          -Math.round((Date.now() - job.created_at.getTime()) / (1000 * 60 * 60 * 24)),
                          'day'
                        ).replace('in ', '')
                      : 'Recently posted'}
                  </span>
                </div>
                
                {/* Description Preview */}
                <div className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {job.desc}
                </div>
                
                {/* Skills Tags */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.slice(0, 3).map((skill, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <Link
                    href={`/job/${job.id}`}
                    target="_blank"
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    View Details
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </Link>
                  
                  {job.contactLink && (
                    <div className="text-xs text-gray-500">
                      {job.contactLink.includes('@') ? 'Email contact set' : 'Application link set'}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${
                    currentPage === 1 
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {getPageRange().map(number => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === number
                        ? 'z-10 bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${
                    currentPage === totalPages 
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation.show && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setDeleteConfirmation({ show: false, jobId: null })}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white rounded-2xl shadow-xl transform transition-all"
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setDeleteConfirmation({ show: false, jobId: null })}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
                    Delete Job Post
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Are you sure you want to delete this job post? This action cannot be undone.
                  </p>
                </div>

                <div className="mt-4 flex justify-center space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setDeleteConfirmation({ show: false, jobId: null })}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => handleDeleteJob(deleteConfirmation.jobId)}
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobPostManager; 