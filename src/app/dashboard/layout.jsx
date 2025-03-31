"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Briefcase, UserCircle, Settings, LogOut, 
  Menu, X, ChevronDown, Home, Users, Building
} from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { logOut } from '@/lib/firebase';

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Navigation items
  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { 
      name: 'Jobs', 
      href: '/dashboard/jobs', 
      icon: Briefcase,
      submenu: [
        { name: 'My Job Listings', href: '/dashboard/jobs' },
        { name: 'Post New Job', href: '/dashboard/jobs/post' },
      ]
    },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold text-gray-800">
            Accessibility Hire
          </Link>
          <button
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* User info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {user.photoURL ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.photoURL}
                  alt={user.displayName || 'User avatar'}
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user.displayName || 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[160px]">
                {user.email}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => 
            item.submenu ? (
              <div key={item.name} className="space-y-1">
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md ${
                    pathname.startsWith(item.href)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => {
                    item.open = !item.open;
                    setSidebarOpen(true);
                  }}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                    {item.name}
                  </div>
                  <ChevronDown className={`h-4 w-4 transform ${item.open ? 'rotate-180' : ''}`} />
                </button>
                
                {(item.open || pathname.startsWith(item.href)) && (
                  <div className="pl-10 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className={`block px-3 py-2 text-sm font-medium rounded-md ${
                          pathname === subitem.href
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                {item.name}
              </Link>
            )
          )}
        </nav>
        
        {/* Logout button */}
        <div className="p-4 border-t border-gray-200 mb-4">
          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-2 w-full text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md"
          >
            <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <div className="sticky top-0 z-10 flex items-center h-16 bg-white border-b border-gray-200 px-4 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="ml-auto flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              <Building className="h-4 w-4 mr-1.5" />
              View Main Site
            </Link>
            
            <Link
              href="/jobs"
              className="inline-flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
            >
              <Briefcase className="h-4 w-4 mr-1.5" />
              View Job Board
            </Link>
          </div>
        </div>
        
        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 