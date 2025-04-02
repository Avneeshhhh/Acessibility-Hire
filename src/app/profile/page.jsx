"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/custom/Navigation/NavBar';
import Footer from '@/components/custom/Navigation/Footer';
import { Building2, Briefcase, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationManager from '@/components/custom/Profile/OrganizationManager';
import JobPostManager from '@/components/custom/Profile/JobPostManager';
import { logOut } from '@/lib/firebase';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("organization");

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be handled by the useEffect redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <NavBar />
      <div className="max-w-4xl mx-auto mt-20">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 mb-8">
          Your Dashboard
        </h1>

        {!user?.organization && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Welcome to Your Profile!</h2>
            <p className="text-blue-700 mb-4">To get started, please create your organization first. This will allow you to post jobs and manage your hiring process.</p>
          </div>
        )}

        <Tabs 
          defaultValue="organization" 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="space-y-6"
        >
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="organization" 
              className="flex items-center space-x-2 data-[state=active]:bg-white rounded-md px-4 py-2"
            >
              <Building2 className="h-4 w-4" />
              <span>Organization</span>
            </TabsTrigger>
            
            <TabsTrigger 
              value="jobs" 
              className="flex items-center space-x-2 data-[state=active]:bg-white rounded-md px-4 py-2"
            >
              <Briefcase className="h-4 w-4" />
              <span>Job Posts</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="organization" className="space-y-6">
            <OrganizationManager />
          </TabsContent>
          
          <TabsContent value="jobs" className="space-y-6">
            <JobPostManager />
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 flex justify-center mb-7">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 bg-red-50 text-red-700 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 