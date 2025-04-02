"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Sparkles, Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpWithEmail, signInWithGoogle } from '@/lib/firebase';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  
  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { user, error } = await signUpWithEmail(formData.email, formData.password);
      
      if (error) {
        let errorMessage = 'Registration failed. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use. Please use a different email or log in.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak. Please choose a stronger password.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address. Please check and try again.';
        }
        
        setErrors({ form: errorMessage });
        setIsSubmitting(false);
        return;
      }
      
      // Store additional user info (could use Firestore later)
      console.log('Account created successfully', user);
      console.log('User details', {
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      // Check user role and redirect accordingly
      if (user.role === 'organization') {
        router.replace('/organization');
      } else {
        router.replace('/profile');
      }
    } catch (error) {
      console.error('Registration failed', error);
      setErrors({ form: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    
    try {
      const { user, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google sign up failed', error);
        setErrors({ form: 'Google sign up failed. Please try again.' });
        setIsSubmitting(false);
        return;
      }
      
      // Successful Google signup
      console.log('Google signup successful', user);
      
      // Check user role and redirect accordingly
      if (user.role === 'organization') {
        router.replace('/organization');
      } else {
        router.replace('/profile');
      }
    } catch (error) {
      console.error('Google sign up failed', error);
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
      
      {/* Moving particles - reduced number for better performance */}
      <div className="absolute inset-0 w-full h-full">
        {Array.from({ length: 10 }).map((_, i) => (
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
      
      {/* Card container - reduced width for better fit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-[90%] max-w-md mx-auto z-10 py-6"
      >
        <div className="glassmorphism p-6 rounded-2xl">
          {/* Logo & Title - reduced spacing */}
          <div className="flex flex-col items-center justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.6 
              }}
              className="w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-gray-300/30"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-black">Create Account</h1>
            <p className="text-sm text-gray-600">Sign up to get started</p>
          </div>
          
          {/* Signup Form - reduced spacing */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name fields (side by side) */}
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                    placeholder="First name"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-0.5">{errors.firstName}</p>
                )}
              </div>
              
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                    placeholder="Last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-0.5">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>
              )}
            </div>
            
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-9 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Create password (8+ characters)"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-0.5">{errors.password}</p>
              )}
            </div>
            
            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-9 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 text-sm"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-0.5">{errors.confirmPassword}</p>
              )}
            </div>
            
            {/* Terms Agreement */}
            <div className="flex items-center mt-1">
              <input
                id="termsAgreed"
                name="termsAgreed"
                type="checkbox"
                checked={formData.termsAgreed}
                onChange={handleChange}
                className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="termsAgreed" className="ml-2 block text-sm text-gray-700">
                I agree to the <Link href="/termsNcondition" className="font-medium text-gray-700 hover:text-gray-900">Terms</Link> and <Link href="/privacy-policy" className="font-medium text-gray-700 hover:text-gray-900">Privacy Policy</Link>
              </label>
            </div>
            {errors.termsAgreed && (
              <p className="text-xs text-red-500 -mt-1">{errors.termsAgreed}</p>
            )}
            
            {/* Error Message */}
            {errors.form && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-sm">
                {errors.form}
              </div>
            )}
            
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid  gap-2">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full inline-flex justify-center py-1.5 px-3 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                <span className="sr-only">Sign up with Google</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.07106 19.252 6.40935 17.1399 5.4632 14.3003H1.45667V17.3912C3.50625 21.4434 7.7044 24.0008 12.24 24.0008Z" fill="#34A853"/>
                  <path d="M5.46321 14.3003C5.22654 13.5681 5.09583 12.7862 5.09583 12.0008C5.09583 11.2154 5.22654 10.4335 5.46321 9.70132V6.61041H1.45667C0.557557 8.23827 0.0644531 10.0749 0.0644531 12.0008C0.0644531 13.9267 0.557557 15.7633 1.45667 17.3912L5.46321 14.3003Z" fill="#FBBC05"/>
                  <path d="M12.24 4.74966C13.9508 4.74966 15.5034 5.36062 16.7413 6.54397L20.1944 3.12135C18.2089 1.18961 15.4764 0 12.24 0C7.7044 0 3.50625 2.55733 1.45667 6.61041L5.46321 9.70132C6.40935 6.86173 9.07106 4.74966 12.24 4.74966Z" fill="#EA4335"/>
                </svg>
              </button>

              {/* <button
                type="button"
                className="w-full inline-flex justify-center py-1.5 px-3 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              >
                <span className="sr-only">Sign up with GitHub</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </button> */}
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-gray-900 hover:text-black">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupForm; 