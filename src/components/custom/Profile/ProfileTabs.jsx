"use client";
import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Bookmark, 
  Settings, 
  Bell, 
  FileText,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import ProfileJobBoard from './ProfileJobBoard';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TabItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
    <span>{label}</span>
  </motion.button>
);

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Home className="mr-2 w-5 h-5 text-indigo-600" />
              Dashboard
            </h2>
            <p className="text-gray-600">Overview of your account and recent activity</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Applications</h3>
                  <span className="text-xs font-medium px-3 py-1 bg-blue-500 text-white rounded-full shadow-sm">3 New</span>
                </div>
                <p className="text-gray-600">You've applied to 5 jobs in the past 30 days</p>
                <Link href="/profile/applications" className="flex items-center text-blue-600 text-sm font-medium mt-4 hover:text-blue-700">
                  View applications <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -4 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Profile Completion</h3>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-green-500 border-l-transparent border-r-transparent border-b-transparent transform rotate-45"></div>
                      <span className="relative text-sm font-bold text-green-700">85%</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Complete your profile to improve job matches</p>
                <Link href="/profile/settings" className="flex items-center text-green-600 text-sm font-medium mt-4 hover:text-green-700">
                  Complete profile <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -4 }}
                className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Your Activity</h3>
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-indigo-700">5</div>
                    <div className="text-gray-600 text-sm">Applications</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-indigo-700">8</div>
                    <div className="text-gray-600 text-sm">Saved Jobs</div>
                  </div>
                  <div className="bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold text-indigo-700">3</div>
                    <div className="text-gray-600 text-sm">Profile Views</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      
      case 'jobs':
        return <ProfileJobBoard />;
      
      case 'saved':
        return (
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Bookmark className="mr-2 w-5 h-5 text-indigo-600" />
              Saved Jobs
            </h2>
            <p className="text-gray-600 mb-6">Jobs you've bookmarked for later</p>
            
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-center py-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">No saved jobs yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">When you find jobs you're interested in, save them here for easy access and comparison</p>
                <Link href="/jobs">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-sm"
                  >
                    Browse Jobs
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      
      case 'applications':
        return (
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="mr-2 w-5 h-5 text-indigo-600" />
              My Applications
            </h2>
            <p className="text-gray-600 mb-6">Track the status of your job applications</p>
            
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-8 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-center py-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">No applications yet</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">When you apply for jobs, you'll be able to track your applications here</p>
                <Link href="/jobs">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-sm"
                  >
                    Find Jobs to Apply
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      
      case 'settings':
        return (
          <motion.div 
            className="p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Settings className="mr-2 w-5 h-5 text-indigo-600" />
              Account Settings
            </h2>
            <p className="text-gray-600 mb-6">Manage your profile and job preferences</p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-5 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                  Job Preferences
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Job Types
                    </label>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Remote</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Desired Salary
                    </label>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>$50,000+</option>
                      <option>$75,000+</option>
                      <option>$100,000+</option>
                      <option>$150,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Remote Preference
                    </label>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option>On-site</option>
                      <option>Hybrid</option>
                      <option>Remote only</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm"
                  >
                    Save Preferences
                  </motion.button>
                </div>
              </div>
              
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
                <h3 className="text-lg font-medium text-gray-800 mb-5 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-indigo-600" />
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                      <p className="text-xs text-gray-500 mt-1">Receive emails about new job matches</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Application Updates</p>
                      <p className="text-xs text-gray-500 mt-1">Get notified about your application status</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      default:
        return <ProfileJobBoard />;
    }
  };
  
  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden mt-8 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200/80 bg-gradient-to-r from-indigo-50 to-indigo-100/50">
        <div className="flex overflow-x-auto p-3 gap-2 scrollbar-hide">
          <TabItem 
            icon={Home} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <TabItem 
            icon={Briefcase} 
            label="Recommended Jobs" 
            active={activeTab === 'jobs'} 
            onClick={() => setActiveTab('jobs')}
          />
          <TabItem 
            icon={Bookmark} 
            label="Saved Jobs" 
            active={activeTab === 'saved'} 
            onClick={() => setActiveTab('saved')}
          />
          <TabItem 
            icon={FileText} 
            label="Applications" 
            active={activeTab === 'applications'} 
            onClick={() => setActiveTab('applications')}
          />
          <TabItem 
            icon={Settings} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
        </div>
      </div>
      
      {renderTabContent()}
    </motion.div>
  );
};

export default ProfileTabs; 