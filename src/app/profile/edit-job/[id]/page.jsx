"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import NavigationGuard from '@/components/custom/Auth/NavigationGuard';
import NavBar from '@/components/custom/Navigation/NavBar';
import Footer from '@/components/custom/Navigation/Footer';
import { ArrowLeft, Briefcase, Building, MapPin, DollarSign, Clock, Calendar, Save, X } from 'lucide-react';
import Link from 'next/link';

const EditJobPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobNotFound, setJobNotFound] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    description: '',
    requirements: '',
    skills: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Load job data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && params.id) {
      try {
        const storedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
        const jobToEdit = storedJobs.find(job => job.id == params.id);
        
        if (jobToEdit) {
          // Format skills back to comma-separated string for form
          const skillsString = Array.isArray(jobToEdit.skills) 
            ? jobToEdit.skills.join(', ')
            : jobToEdit.skills || '';
            
          setFormData({
            ...jobToEdit,
            skills: skillsString
          });
        } else {
          setJobNotFound(true);
        }
      } catch (error) {
        console.error('Error loading job:', error);
        setJobNotFound(true);
      }
    }
  }, [params.id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary information is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Get existing jobs from localStorage
      const storedJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]');
      
      // Find index of the job to update
      const jobIndex = storedJobs.findIndex(job => job.id == params.id);
      
      if (jobIndex !== -1) {
        // Process the updated job data
        const updatedJob = {
          ...storedJobs[jobIndex],
          ...formData,
          skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
          updatedDate: new Date().toISOString()
        };
        
        // Update the job in the array
        storedJobs[jobIndex] = updatedJob;
        
        // Save back to localStorage
        localStorage.setItem('postedJobs', JSON.stringify(storedJobs));
        
        // Redirect to profile page
        router.push('/profile');
      } else {
        console.error('Job not found');
        setJobNotFound(true);
      }
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (jobNotFound) {
    return (
      <NavigationGuard requireAuth={true}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <NavBar />
          
          <main className="max-w-4xl mx-auto px-4 py-12 mt-14">
            <div className="text-center p-12 bg-white rounded-2xl shadow-md">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h1>
              <p className="text-gray-600 mb-6">The job you're trying to edit doesn't exist or you don't have permission to edit it.</p>
              <Link
                href="/profile"
                className="px-5 py-2.5 bg-slate-700 text-white font-medium rounded-lg shadow-sm hover:bg-slate-800 transition-colors"
              >
                Return to Profile
              </Link>
            </div>
          </main>
          
          <Footer />
        </div>
      </NavigationGuard>
    );
  }
  
  return (
    <NavigationGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <NavBar />
        
        <main className="max-w-4xl mx-auto px-4 py-12 mt-14">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              href="/profile" 
              className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Link>
          </div>
          
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-8 py-8 text-white">
              <div className="flex items-center">
                <Briefcase className="w-8 h-8 mr-4" />
                <div>
                  <h1 className="text-2xl font-bold">Edit Job</h1>
                  <p className="text-white/70 mt-1">Update your job listing details</p>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`pl-10 w-full py-2.5 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>
                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                  </div>
                  
                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`pl-10 w-full py-2.5 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${errors.company ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="e.g. Acme Inc"
                      />
                    </div>
                    {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`pl-10 w-full py-2.5 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="e.g. New York, NY or Remote"
                      />
                    </div>
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                  </div>
                  
                  {/* Salary */}
                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                      Salary <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className={`pl-10 w-full py-2.5 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${errors.salary ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        placeholder="e.g. $80,000 - $120,000/year"
                      />
                    </div>
                    {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
                  </div>
                  
                  {/* Job Type */}
                  <div>
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="jobType"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                      Required Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                      placeholder="e.g. React, TypeScript, Node.js"
                    />
                  </div>
                </div>
                
                {/* Job Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full py-2.5 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                    placeholder="Describe the job responsibilities, requirements, and any other relevant information..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
                
                {/* Requirements */}
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={4}
                    className="w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                    placeholder="List any additional requirements or qualifications..."
                  />
                </div>
                
                {/* Form actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => router.push('/profile')}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Job
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </NavigationGuard>
  );
};

export default EditJobPage; 