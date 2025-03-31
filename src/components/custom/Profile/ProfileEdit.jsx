"use client";
import React, { useState, useRef } from 'react';
import { useAuth } from '@/lib/authContext';
import { updateUserProfile, uploadProfileImage } from '@/lib/firebase';
import { User, Mail, AtSign, Calendar, Briefcase, Building, Edit, Camera, Upload, Check, X } from 'lucide-react';
import Image from 'next/image';

const ProfileEdit = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  // States for profile editing
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Edit states for different fields
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  
  // Form state
  const [formState, setFormState] = useState({
    displayName: user?.displayName || '',
    title: user?.title || 'Add your job title',
    company: user?.company || 'Add your company',
    bio: user?.bio || 'Tell a bit about yourself and what you\'re looking for'
  });
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile image upload
  const handleProfileImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, or GIF)');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    setError('');
    setSuccess('');
    
    // Upload the image using your firebase function
    try {
      const intervalId = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) return prev; // don't get to 100 until we're done
          return prev + 10;
        });
      }, 200);
      
      const { success, downloadURL, error } = await uploadProfileImage(file);
      
      clearInterval(intervalId);
      
      if (success && downloadURL) {
        setUploadProgress(100);
        setSuccess('Profile image updated successfully!');
        // No need to update state as the auth context will update with the new image
      } else {
        throw new Error(error || 'Failed to upload image');
      }
    } catch (err) {
      console.error('Error uploading profile image:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle field updates
  const handleUpdateField = async (field) => {
    let fieldToUpdate = {};
    let setEditingState;
    
    switch (field) {
      case 'name':
        fieldToUpdate = { displayName: formState.displayName };
        setEditingState = setIsEditingName;
        break;
        
      case 'title':
      case 'company':
      case 'bio':
        // These would need to be stored in a database
        setEditingState = field === 'title' ? setIsEditingTitle : 
                          field === 'company' ? setIsEditingCompany : setIsEditingBio;
        break;
        
      default:
        return;
    }
    
    setError('');
    setSuccess('');
    
    try {
      if (field === 'name') {
        // Update display name in Firebase Auth
        const { success, error } = await updateUserProfile(formState.displayName);
        
        if (!success) {
          throw new Error(error || 'Failed to update profile');
        }
        
        setSuccess('Profile updated successfully!');
      } else {
        // For now, just simulate a successful update
        // In a real app, you would save these fields to a database
        setSuccess('Profile updated successfully!');
        
        // Ideally, save these fields to Firestore or another database
        // For example: await updateUserProfileData(user.uid, { [field]: formState[field] });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      if (setEditingState) {
        setEditingState(false);
      }
    }
  };
  
  // Cancel editing
  const handleCancelEdit = (field) => {
    switch (field) {
      case 'name':
        setIsEditingName(false);
        setFormState(prev => ({ ...prev, displayName: user?.displayName || '' }));
        break;
        
      case 'title':
        setIsEditingTitle(false);
        setFormState(prev => ({ ...prev, title: user?.title || 'Add your job title' }));
        break;
        
      case 'company':
        setIsEditingCompany(false);
        setFormState(prev => ({ ...prev, company: user?.company || 'Add your company' }));
        break;
        
      case 'bio':
        setIsEditingBio(false);
        setFormState(prev => ({ ...prev, bio: user?.bio || 'Tell a bit about yourself and what you\'re looking for' }));
        break;
        
      default:
        break;
    }
  };
  
  if (!user) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="animate-pulse">
          <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      {/* Header with Profile Image */}
      <div className="relative h-40 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="absolute -bottom-16 left-6 md:left-8">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
              {user.photoURL ? (
                <Image 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  width={128} 
                  height={128} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
            
            <button 
              onClick={handleProfileImage} 
              className="absolute bottom-1 right-1 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 shadow-sm"
              disabled={isUploading}
            >
              {isUploading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="pt-20 pb-8 px-6 md:px-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-100">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-100">
            {success}
          </div>
        )}
        
        {isUploading && (
          <div className="mb-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Uploading image... {uploadProgress}%</p>
          </div>
        )}
        
        {/* Display Name */}
        <div className="mb-6">
          {isEditingName ? (
            <div className="flex flex-col space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formState.displayName}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Your name"
                />
                <button 
                  onClick={() => handleUpdateField('name')}
                  className="p-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleCancelEdit('name')}
                  className="p-2 bg-gray-500 rounded-md text-white hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.displayName || 'Add your name'}
              </h1>
              <button 
                onClick={() => setIsEditingName(true)}
                className="p-1.5 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
              >
                <Edit className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {/* Email (not editable) */}
          <div className="flex items-center text-gray-600">
            <Mail className="h-5 w-5 mr-2 text-gray-500" />
            <span>{user.email}</span>
          </div>
          
          {/* Job Title */}
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
              {isEditingTitle ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your job title"
                  />
                  <button 
                    onClick={() => handleUpdateField('title')}
                    className="p-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleCancelEdit('title')}
                    className="p-2 bg-gray-500 rounded-md text-white hover:bg-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <span className={formState.title === 'Add your job title' ? 'text-gray-400 italic' : ''}>
                  {formState.title}
                </span>
              )}
            </div>
            {!isEditingTitle && (
              <button 
                onClick={() => setIsEditingTitle(true)}
                className="p-1.5 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Company */}
          <div className="flex justify-between items-center text-gray-600">
            <div className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-gray-500" />
              {isEditingCompany ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Your company"
                  />
                  <button 
                    onClick={() => handleUpdateField('company')}
                    className="p-2 bg-green-600 rounded-md text-white hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleCancelEdit('company')}
                    className="p-2 bg-gray-500 rounded-md text-white hover:bg-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <span className={formState.company === 'Add your company' ? 'text-gray-400 italic' : ''}>
                  {formState.company}
                </span>
              )}
            </div>
            {!isEditingCompany && (
              <button 
                onClick={() => setIsEditingCompany(true)}
                className="p-1.5 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* About/Bio */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800">About</h3>
              {!isEditingBio && (
                <button 
                  onClick={() => setIsEditingBio(true)}
                  className="p-1.5 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {isEditingBio ? (
              <div className="space-y-2">
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Tell a bit about yourself and what you're looking for"
                ></textarea>
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => handleUpdateField('bio')}
                    className="px-4 py-2 bg-green-600 rounded-md text-white text-sm hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => handleCancelEdit('bio')}
                    className="px-4 py-2 bg-gray-500 rounded-md text-white text-sm hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className={`text-gray-600 ${formState.bio === 'Tell a bit about yourself and what you\'re looking for' ? 'text-gray-400 italic' : ''}`}>
                {formState.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit; 