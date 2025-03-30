"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';

// Component to protect routes that require authentication
const NavigationGuard = ({ children, requireAuth }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Skip during initial loading
    if (loading) return;

    // If authentication is required but user is not logged in, redirect to login
    if (requireAuth && !user) {
      router.push('/login');
    }
    
    // If user is already authenticated and trying to access login/signup pages
    if (!requireAuth && user) {
      router.push('/');
    }
  }, [user, loading, requireAuth, router]);

  // If loading or during redirect, show nothing or a loading indicator
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Show children only when the conditions are met:
  // 1. If auth is required and user is logged in
  // 2. If auth is not required and user is not logged in
  if ((requireAuth && user) || (!requireAuth && !user)) {
    return children;
  }

  // Default: return null while redirecting
  return null;
};

export default NavigationGuard; 