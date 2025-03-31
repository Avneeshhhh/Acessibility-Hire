"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import JobPostForm from '@/components/custom/JobPosting/JobPostForm';
import { Loader } from 'lucide-react';

const PostJobPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-gray-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-600">Create a job posting to find qualified candidates.</p>
        </div>
        
        <JobPostForm />
      </div>
    </div>
  );
};

export default PostJobPage; 