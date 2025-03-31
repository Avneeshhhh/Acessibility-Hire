"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Accessibility, Lock, Mail, ArrowRight, CheckCircle, Key, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { user, error } = await signInWithEmail(email, password);
      
      if (error) {
        const errorMessage = error.code === 'auth/invalid-credential' 
          ? 'Invalid email or password' 
          : 'An error occurred. Please try again.';
        
        setErrors({ form: errorMessage });
        setIsSubmitting(false);
        return;
      }
      
      // Successful login
      console.log('Login successful', user);
      
      // Redirect to home page or dashboard
      router.push('/');
    } catch (error) {
      console.error('Login failed', error);
      setErrors({ form: 'Login failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    
    try {
      const { user, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google sign in failed', error);
        setErrors({ form: 'Google sign in failed. Please try again.' });
        setIsSubmitting(false);
        return;
      }
      
      // Successful Google login
      console.log('Google login successful', user);
      
      // Redirect to home page or dashboard
      router.push('/');
    } catch (error) {
      console.error('Google sign in failed', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-50">
      {/* Background SVG with parallax effect */}
      <div 
        className="absolute inset-0 w-full h-full opacity-50"
        style={{
          transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <img src="/images/purple-landscape.svg" alt="Background" className="w-full h-full object-cover" />
      </div>
      
      {/* Moving particles */}
      <div className="absolute inset-0 w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-50 text-blue-400"
            animate={{
              y: ['0%', '100%'],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: 'linear'
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
            }}
          >
            <Sparkles className="h-3 w-3" />
          </motion.div>
        ))}
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/70" />
      
      {/* Card container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[90%] max-w-md mx-auto z-10"
      >
        <div className="glassmorphism p-8 rounded-2xl">
          {/* Logo & Title */}
          <div className="flex flex-col items-center justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.6 
              }}
              className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-gray-300/30"
            >
              <svg viewBox="0 0 24 24" className="h-10 w-10 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">Welcome Back</h1>
            <p className="text-gray-600 text-sm mt-1">Sign in to continue to your account</p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-gray-700 hover:text-gray-900">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.07106 19.252 6.40935 17.1399 5.4632 14.3003H1.45667V17.3912C3.50625 21.4434 7.7044 24.0008 12.24 24.0008Z" fill="#34A853"/>
                  <path d="M5.46321 14.3003C5.22654 13.5681 5.09583 12.7862 5.09583 12.0008C5.09583 11.2154 5.22654 10.4335 5.46321 9.70132V6.61041H1.45667C0.557557 8.23827 0.0644531 10.0749 0.0644531 12.0008C0.0644531 13.9267 0.557557 15.7633 1.45667 17.3912L5.46321 14.3003Z" fill="#FBBC05"/>
                  <path d="M12.24 4.74966C13.9508 4.74966 15.5034 5.36062 16.7413 6.54397L20.1944 3.12135C18.2089 1.18961 15.4764 0 12.24 0C7.7044 0 3.50625 2.55733 1.45667 6.61041L5.46321 9.70132C6.40935 6.86173 9.07106 4.74966 12.24 4.74966Z" fill="#EA4335"/>
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                <span className="sr-only">Sign in with GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-gray-900 hover:text-black">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm; 