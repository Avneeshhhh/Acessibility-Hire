"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle, User, Mail, Key, Lock, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signUpWithEmail, signInWithGoogle } from '@/lib/firebase';

const SignupForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'jobseeker', // or 'employer'
    termsAgreed: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Account type selection handler
  const handleAccountTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      accountType: type
    }));
  };
  
  // Form validation
  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
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
    } else if (currentStep === 2) {
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Step navigation handlers
  const goToNextStep = () => {
    if (validateStep(step)) {
      setStep(prevStep => prevStep + 1);
    }
  };
  
  const goToPrevStep = () => {
    setStep(prevStep => prevStep - 1);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
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
        lastName: formData.lastName,
        accountType: formData.accountType
      });
      
      // Redirect to login or dashboard
      router.push('/login');
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
      
      // Redirect to home page or dashboard
      router.push('/');
    } catch (error) {
      console.error('Google sign up failed', error);
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
  
  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    })
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Form */}
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
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h2>
              <p className="text-gray-600">
                {step === 1 
                  ? "Let's start with your basic information" 
                  : "Complete your security details"}
              </p>
              
              {/* Progress Indicator */}
              <div className="flex justify-center items-center mt-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    1
                  </div>
                  <div className="w-12 h-1 bg-gray-200">
                    <div className={`h-full ${step > 1 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className={`h-8 w-8 rounded-full ${step > 1 ? 'bg-purple-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-400'} flex items-center justify-center font-medium`}>
                    2
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Body */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait" initial={false} custom={step}>
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* First Name */}
                    <motion.div variants={itemVariants}>
                      <div className="relative">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`block w-full pl-12 pr-4 py-3 border ${
                              errors.firstName ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Last Name */}
                    <motion.div variants={itemVariants}>
                      <div className="relative">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-purple-500" />
                          </div>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`block w-full pl-12 pr-4 py-3 border ${
                              errors.lastName ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="Doe"
                          />
                        </div>
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Email */}
                    <motion.div variants={itemVariants}>
                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-purple-500" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`block w-full pl-12 pr-4 py-3 border ${
                              errors.email ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="john.doe@example.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Account Type Selection */}
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => handleAccountTypeChange('jobseeker')}
                          className={`flex flex-col items-center p-4 rounded-xl border-2 ${
                            formData.accountType === 'jobseeker' 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-200'
                          }`}
                        >
                          <Users className={`h-8 w-8 mb-2 ${formData.accountType === 'jobseeker' ? 'text-purple-600' : 'text-gray-400'}`} />
                          <span className={formData.accountType === 'jobseeker' ? 'text-purple-700 font-medium' : 'text-gray-600'}>Job Seeker</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAccountTypeChange('employer')}
                          className={`flex flex-col items-center p-4 rounded-xl border-2 ${
                            formData.accountType === 'employer' 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-200'
                          }`}
                        >
                          <Briefcase className={`h-8 w-8 mb-2 ${formData.accountType === 'employer' ? 'text-purple-600' : 'text-gray-400'}`} />
                          <span className={formData.accountType === 'employer' ? 'text-purple-700 font-medium' : 'text-gray-600'}>Employer</span>
                        </button>
                      </div>
                    </motion.div>
                    
                    {/* Next Button */}
                    <motion.div variants={itemVariants}>
                      <Button
                        type="button"
                        onClick={goToNextStep}
                        className="w-full h-14 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white rounded-xl shadow-md transition-all duration-300 flex items-center justify-center text-base font-medium"
                      >
                        <div className="flex items-center">
                          Continue
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
                
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={-1}
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* Password */}
                    <motion.div variants={itemVariants}>
                      <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Create Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-purple-500" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            className={`block w-full pl-12 pr-12 py-3 border ${
                              errors.password ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                          Password must be at least 8 characters long.
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Confirm Password */}
                    <motion.div variants={itemVariants}>
                      <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-purple-500" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`block w-full pl-12 pr-12 py-3 border ${
                              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                            } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-purple-500" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Terms Agreement */}
                    <motion.div variants={itemVariants} className="flex items-start mt-4">
                      <div className="flex items-center h-5">
                        <input
                          id="termsAgreed"
                          name="termsAgreed"
                          type="checkbox"
                          checked={formData.termsAgreed}
                          onChange={handleChange}
                          className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="termsAgreed" className="text-gray-600 select-none">
                          I agree to the <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-medium">Terms of Service</Link> and <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium">Privacy Policy</Link>
                        </label>
                        {errors.termsAgreed && (
                          <p className="mt-1 text-sm text-red-500">{errors.termsAgreed}</p>
                        )}
                      </div>
                    </motion.div>
                    
                    {/* Error Message */}
                    {errors.form && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-red-50 border border-red-200"
                      >
                        <p className="text-sm text-red-600">{errors.form}</p>
                      </motion.div>
                    )}
                    
                    {/* Google Sign Up */}
                    <motion.div variants={itemVariants} className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={handleGoogleSignUp}
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 shadow-sm rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                              <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                              <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                              <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                              <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                            </g>
                          </svg>
                          Sign up with Google
                        </button>
                      </div>
                    </motion.div>
                    
                    {/* Form Navigation */}
                    <motion.div variants={itemVariants} className="flex gap-4">
                      <Button
                        type="button"
                        onClick={goToPrevStep}
                        className="w-1/3 h-14 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl shadow-sm transition-all duration-300 flex items-center justify-center text-base font-medium"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-2/3 h-14 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white rounded-xl shadow-md transition-all duration-300 flex items-center justify-center text-base font-medium"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Sign In Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-center mt-8"
              >
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link href="/login" className="font-medium text-purple-600 hover:text-purple-700">
                    Sign in
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
                    <span>Secure Registration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                    <span>Privacy Protected</span>
                  </div>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600">
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
                <UserPlus className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-white/80 max-w-md mb-10">
              Create an account to unlock a world of inclusive opportunities designed for your unique skills and talents.
            </p>
            <div className="grid grid-cols-1 gap-6 w-full max-w-lg">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="font-semibold text-xl mb-3">Benefits of joining:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-fuchsia-300 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Access to inclusive job opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-fuchsia-300 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Connect with disability-friendly employers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-fuchsia-300 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">Resources tailored to your specific needs</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm; 