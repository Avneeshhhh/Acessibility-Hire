"use client";
import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Building, MapPin, Clock, Users, 
  Plus, Calendar, ChevronRight, Activity, BarChart,
  FileText, CheckCircle, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { getJobsByUser } from '@/lib/jobService';

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    viewsThisMonth: 0,
    conversionRate: 0
  });
  
  // Load user's jobs
  useEffect(() => {
    const fetchJobs = async () => {
      if (authLoading || !user) return;
      
      try {
        setLoading(true);
        const userJobs = await getJobsByUser(user.uid);
        setJobs(userJobs);
        
        // Calculate stats
        const activeJobs = userJobs.filter(job => job.status === 'active').length;
        
        // In a real app, you would fetch these from the backend
        // For now, let's use example data
        setStats({
          activeJobs,
          totalApplications: Math.floor(Math.random() * 100),
          viewsThisMonth: Math.floor(Math.random() * 1000),
          conversionRate: Math.floor(Math.random() * 10) + 5 // 5-15%
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [user, authLoading]);
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Quick action items
  const quickActions = [
    {
      title: 'Post a New Job',
      description: 'Create a new job listing to find qualified candidates',
      icon: Plus,
      href: '/dashboard/jobs/post',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'View Job Board',
      description: 'See all active job listings on the platform',
      icon: Briefcase,
      href: '/jobs',
      color: 'bg-green-100 text-green-700'
    },
    {
      title: 'Update Profile',
      description: 'Edit your company profile and contact information',
      icon: Building,
      href: '/dashboard/profile',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      title: 'View Applications',
      description: 'Review candidates who applied to your listings',
      icon: FileText,
      href: '/dashboard/applications',
      color: 'bg-amber-100 text-amber-700'
    }
  ];
  
  // Recent activity items (in a real app, these would come from the backend)
  const recentActivity = [
    {
      type: 'job_created',
      message: 'You posted a new job: Frontend Developer',
      time: '2 hours ago'
    },
    {
      type: 'application_received',
      message: 'New application for: UX Designer',
      time: '1 day ago'
    },
    {
      type: 'job_viewed',
      message: 'Your job "Product Manager" was viewed 24 times',
      time: '2 days ago'
    }
  ];
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.displayName || 'User'}!</p>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.activeJobs}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Applications</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalApplications}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Views this month</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.viewsThisMonth}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-amber-100 rounded-lg">
                <BarChart className="h-6 w-6 text-amber-700" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Quick actions and recent jobs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg mr-4 ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Recent Jobs */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Job Listings</h2>
                <Link 
                  href="/dashboard/jobs"
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading recent jobs...</div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
                  <Link 
                    href="/dashboard/jobs/post"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Post Your First Job
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.slice(0, 3).map(job => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{job.title}</h3>
                          <div className="flex flex-wrap text-gray-600 text-sm mt-1">
                            <div className="flex items-center mr-4">
                              <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span>{job.company}</span>
                            </div>
                            <div className="flex items-center mr-4">
                              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="p-1.5 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/dashboard/jobs/edit/${job.id}`}
                            className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                          >
                            <FileText className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500 flex items-center justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          <span>
                            Posted on {formatDate(job.createdAt)}
                            {job.applicationDeadline && ` · Deadline: ${formatDate(job.applicationDeadline)}`}
                          </span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full ${job.status === 'active' ? 'bg-green-500' : 'bg-gray-300'} mr-1.5`}></div>
                          <span className="capitalize">{job.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Recent activity and resources */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              
              {recentActivity.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No recent activity
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {activity.type === 'job_created' && <Plus className="h-4 w-4 text-green-600" />}
                          {activity.type === 'application_received' && <Users className="h-4 w-4 text-blue-600" />}
                          {activity.type === 'job_viewed' && <Activity className="h-4 w-4 text-purple-600" />}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Help & Resources */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Help & Resources</h2>
              
              <div className="space-y-3">
                <Link href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="mr-3 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">How to Write Effective Job Descriptions</h3>
                    <p className="text-xs text-gray-600">Tips for attracting the right candidates</p>
                  </div>
                </Link>
                
                <Link href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="mr-3 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Accessibility Best Practices</h3>
                    <p className="text-xs text-gray-600">Creating inclusive job postings</p>
                  </div>
                </Link>
                
                <Link href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="mr-3 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Evaluating Candidates</h3>
                    <p className="text-xs text-gray-600">Interview strategies for diverse hiring</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 