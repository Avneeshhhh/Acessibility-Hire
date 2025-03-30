"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Accessibility, Lock, Mail, ArrowRight, CheckCircle, Key } from 'lucide-react';
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-20"></div>
        </div>
        <div className="relative z-10 px-12 py-12 text-white flex flex-col items-center justify-center h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-white/10 backdrop-blur-3xl rounded-full opacity-20"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Accessibility className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Accessibility Hire</h2>
            <p className="text-xl text-white/80 max-w-md mb-10">
              Your bridge to inclusive employment. Connect with opportunities that value your unique talents and experiences.
            </p>
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold text-lg mb-2">5,000+</h3>
                <p className="text-sm text-white/70">Professionals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <h3 className="font-semibold text-lg mb-2">200+</h3>
                <p className="text-sm text-white/70">Inclusive Employers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {/* Form Header */}
            <div className="text-center mb-10">
              <div className="lg:hidden flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <Accessibility className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>
            
            {/* Form Body */}
            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full pl-12 pr-4 py-3 border ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="example@company.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </motion.div>
              
              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-indigo-500" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full pl-12 pr-12 py-3 border ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-indigo-500" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </motion.div>
              
              {/* Remember Me Checkbox */}
              <motion.div variants={itemVariants} className="flex items-center">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember-me" className="text-gray-600 select-none font-medium">
                      Keep me signed in
                    </label>
                  </div>
                </div>
              </motion.div>
              
              {/* Form Error */}
              {errors.form && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200"
                >
                  <p className="text-sm text-red-600">{errors.form}</p>
                </motion.div>
              )}
              
              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md transition-all duration-300 flex items-center justify-center text-base font-medium"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.form>
            
            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="px-4 text-sm text-gray-500">or</div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            {/* Social Login Options */}
            <motion.div variants={itemVariants} className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                    </g>
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </motion.div>
            
            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">
                  Create an account
                </Link>
              </p>
            </motion.div>
            
            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                  <span>Privacy Protected</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 