"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Building, MapPin, Clock, DollarSign, 
  List, FileText, UserPlus, Calendar, ArrowRight, CheckCircle, X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { addJob } from '@/lib/jobService';

const JobPostForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'full-time',
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: 'USD',
    salaryPeriod: 'yearly',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    applicationDeadline: '',
    applicationUrl: '',
    contactEmail: user?.email || '',
    isAccessible: true,
    accessibilityOptions: [],
    postedBy: user?.uid || ''
  });

  const [errors, setErrors] = useState({});

  // Accessibility options
  const accessibilityOptions = [
    { id: 'flexible-hours', label: 'Flexible Working Hours' },
    { id: 'remote-work', label: 'Remote Work Options' },
    { id: 'screen-reader', label: 'Screen Reader Compatible Workplace' },
    { id: 'mobility-access', label: 'Wheelchair/Mobility Accessible' },
    { id: 'assistive-tech', label: 'Assistive Technology Available' },
    { id: 'sign-language', label: 'Sign Language Support' }
  ];

  // Job types
  const jobTypes = [
    { value: 'full-time', label: 'Full-Time' },
    { value: 'part-time', label: 'Part-Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'internship', label: 'Internship' },
    { value: 'remote', label: 'Remote' }
  ];

  // Currency options
  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'GBP', label: 'GBP (£)' },
    { value: 'CAD', label: 'CAD ($)' },
    { value: 'AUD', label: 'AUD ($)' },
    { value: 'INR', label: 'INR (₹)' }
  ];

  // Payment period options
  const paymentPeriods = [
    { value: 'hourly', label: 'Per Hour' },
    { value: 'daily', label: 'Per Day' },
    { value: 'weekly', label: 'Per Week' },
    { value: 'monthly', label: 'Per Month' },
    { value: 'yearly', label: 'Per Year' }
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // For single checkbox
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      // For all other inputs
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle accessibility options change
  const handleAccessibilityChange = (optionId) => {
    const currentOptions = [...formData.accessibilityOptions];
    
    if (currentOptions.includes(optionId)) {
      // Remove option if already selected
      setFormData({
        ...formData,
        accessibilityOptions: currentOptions.filter(id => id !== optionId)
      });
    } else {
      // Add option if not already selected
      setFormData({
        ...formData,
        accessibilityOptions: [...currentOptions, optionId]
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.requirements.trim()) newErrors.requirements = 'Job requirements are required';
    
    // Validate salary if provided
    if (formData.salaryMin && formData.salaryMax) {
      if (parseFloat(formData.salaryMin) > parseFloat(formData.salaryMax)) {
        newErrors.salaryMin = 'Minimum salary cannot be greater than maximum salary';
      }
    }
    
    // Validate application deadline if provided
    if (formData.applicationDeadline) {
      const deadlineDate = new Date(formData.applicationDeadline);
      const today = new Date();
      
      if (deadlineDate < today) {
        newErrors.applicationDeadline = 'Application deadline cannot be in the past';
      }
    }
    
    // Validate email format
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.text-red-500');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Format the job data
      const jobData = {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'active',
        // Add user information
        postedBy: user?.uid || 'anonymous',
        companyLogo: '', // Could be implemented with file upload
      };
      
      // Call the service to add the job
      await addJob(jobData);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard/jobs');
      }, 2000);
      
    } catch (error) {
      console.error('Error posting job:', error);
      setSubmitError('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h2>
          <p className="text-gray-600 mb-8">Your job has been posted and is now visible on the job board.</p>
          <button
            onClick={() => router.push('/dashboard/jobs')}
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
          >
            View Your Jobs
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
      
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <div className="mr-3 bg-red-100 rounded-full p-1">
            <X className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700">{submitError}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Job Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Job Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                  placeholder="e.g. Software Engineer"
                />
              </div>
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>
            
            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.company ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                  placeholder="e.g. Acme Inc."
                />
              </div>
              {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
            </div>
            
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                  placeholder="e.g. New York, NY or Remote"
                />
              </div>
              {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
            </div>
            
            {/* Job Type */}
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type*
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  {jobTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Salary Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Minimum Salary */}
            <div>
              <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.salaryMin ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                  placeholder="e.g. 50000"
                />
              </div>
              {errors.salaryMin && <p className="mt-1 text-sm text-red-500">{errors.salaryMin}</p>}
            </div>
            
            {/* Maximum Salary */}
            <div>
              <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="e.g. 70000"
                />
              </div>
            </div>
            
            {/* Currency */}
            <div>
              <label htmlFor="salaryCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                id="salaryCurrency"
                name="salaryCurrency"
                value={formData.salaryCurrency}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency.value} value={currency.value}>{currency.label}</option>
                ))}
              </select>
            </div>
            
            {/* Payment Period */}
            <div>
              <label htmlFor="salaryPeriod" className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <select
                id="salaryPeriod"
                name="salaryPeriod"
                value={formData.salaryPeriod}
                onChange={handleChange}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              >
                {paymentPeriods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Job Description */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
          
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description*
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                placeholder="Provide a detailed description of the job role"
              />
            </div>
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
          
          {/* Requirements */}
          <div className="mb-4">
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-1">
              Requirements*
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <List className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className={`block w-full pl-10 pr-3 py-2 border ${errors.requirements ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                placeholder="List the skills, qualifications, and experience required"
              />
            </div>
            {errors.requirements && <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>}
          </div>
          
          {/* Responsibilities */}
          <div className="mb-4">
            <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-1">
              Responsibilities
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <List className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={4}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="Outline the key responsibilities for this role"
              />
            </div>
          </div>
          
          {/* Benefits */}
          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">
              Benefits & Perks
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <List className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={3}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="List any benefits like health insurance, flexible hours, etc."
              />
            </div>
          </div>
        </div>
        
        {/* Accessibility Options */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Accessibility & Inclusion</h2>
          
          <div className="mb-4">
            <div className="flex items-center">
              <input
                id="isAccessible"
                name="isAccessible"
                type="checkbox"
                checked={formData.isAccessible}
                onChange={handleChange}
                className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="isAccessible" className="ml-2 block text-sm text-gray-700">
                This job is accessible to people with disabilities
              </label>
            </div>
          </div>
          
          {formData.isAccessible && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Accommodations (Select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {accessibilityOptions.map(option => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={option.id}
                      type="checkbox"
                      checked={formData.accessibilityOptions.includes(option.id)}
                      onChange={() => handleAccessibilityChange(option.id)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option.id} className="ml-2 block text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Application Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Application Deadline */}
            <div>
              <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.applicationDeadline ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                />
              </div>
              {errors.applicationDeadline && <p className="mt-1 text-sm text-red-500">{errors.applicationDeadline}</p>}
            </div>
            
            {/* Application URL */}
            <div>
              <label htmlFor="applicationUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Application URL
              </label>
              <input
                id="applicationUrl"
                name="applicationUrl"
                type="url"
                value={formData.applicationUrl}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                placeholder="e.g. https://yourcompany.com/careers/apply"
              />
            </div>
            
            {/* Contact Email */}
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.contactEmail ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                  placeholder="e.g. careers@acme.com"
                />
              </div>
              {errors.contactEmail && <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>}
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm; 