"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { logOut, uploadProfileImage, updateUserProfile } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import NavigationGuard from '@/components/custom/Auth/NavigationGuard';
import NavBar from '@/components/custom/Navigation/NavBar';
import Footer from '@/components/custom/Navigation/Footer';
import { User, Mail, LogOut, Camera, Calendar, Edit, Check, X, AtSign, Briefcase, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProfileEditPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  
  // Editable fields states
  const [displayName, setDisplayName] = useState('');
  const [jobTitle, setJobTitle] = useState('Not specified');
  const [company, setCompany] = useState('Not specified');
  const [bio, setBio] = useState('');
  
  // Editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingJobTitle, setIsEditingJobTitle] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  
  const fileInputRef = useRef(null);

  // Set initial values when user data is available
  useEffect(() => {
    if (user) {
      setProfileImage(user.photoURL);
      setDisplayName(user.displayName || user.email?.split('@')[0] || "User");
      
      // If these fields exist in the user object (this would require you to store them in a database)
      // For now we'll set defaults
      setBio(user.bio || '');
      setJobTitle(user.jobTitle || 'Not specified');
      setCompany(user.company || 'Not specified');
    }
  }, [user]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const { success, error } = await logOut();
      if (success) {
        router.push('/login');
      } else {
        console.error('Logout failed', error);
      }
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setUploadError('');
      
      try {
        // Create a local preview
        const localPreview = URL.createObjectURL(file);
        setProfileImage(localPreview);
        
        // Upload to Firebase
        const { success, downloadURL, error } = await uploadProfileImage(file);
        
        if (success) {
          // Update state with Firebase URL
          setProfileImage(downloadURL);
        } else {
          setUploadError('Failed to upload image. Please try again.');
          console.error('Upload error:', error);
        }
      } catch (error) {
        setUploadError('An error occurred. Please try again.');
        console.error('Upload error:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleNameUpdate = async () => {
    if (displayName.trim()) {
      try {
        const { success, error } = await updateUserProfile(displayName, null);
        
        if (!success) {
          console.error('Failed to update profile name:', error);
        }
      } catch (error) {
        console.error('Error updating profile name:', error);
      } finally {
        setIsEditingName(false);
      }
    }
  };

  // For job title, company and bio, in a real app you would store these in Firestore or another database
  const handleJobTitleUpdate = () => {
    setIsEditingJobTitle(false);
    // Here you would save to Firestore/database
  };

  const handleCompanyUpdate = () => {
    setIsEditingCompany(false);
    // Here you would save to Firestore/database
  };

  const handleBioUpdate = () => {
    setIsEditingBio(false);
    // Here you would save to Firestore/database
  };

  return (
    <NavigationGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <NavBar />
        
        <main className="max-w-4xl mx-auto px-4 py-12 mt-14">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              href="/profile" 
              className="inline-flex items-center text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="bg-white shadow rounded-2xl overflow-hidden animate-fadeIn">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 px-8 py-14 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
              <div className="absolute right-0 top-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute left-0 bottom-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative flex flex-col md:flex-row items-center md:items-start">
                <div className="relative mb-6 md:mb-0 md:mr-8">
                  <div className={`h-32 w-32 rounded-full border-4 border-white/20 shadow-xl overflow-hidden relative ${isUploading ? 'opacity-50' : ''}`}>
                    {profileImage ? (
                      <Image 
                        src={profileImage}
                        alt={displayName}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <User className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin h-10 w-10 border-3 border-white border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image upload button */}
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors ring-2 ring-slate-800"
                    title="Upload profile picture"
                  >
                    <Camera className="h-4 w-4 text-slate-800" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </button>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  {isEditingName ? (
                    <div className="flex items-center mb-2 justify-center md:justify-start">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-white/50"
                      />
                      <button 
                        onClick={handleNameUpdate}
                        className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <Check className="h-5 w-5 text-white" />
                      </button>
                      <button 
                        onClick={() => setIsEditingName(false)}
                        className="ml-1 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center mb-2 justify-center md:justify-start">
                      <h1 className="text-3xl font-bold tracking-tight">{displayName}</h1>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title="Edit name"
                      >
                        <Edit className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center md:justify-start mb-3">
                    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm">
                      <AtSign className="h-3.5 w-3.5 text-white/70 mr-1.5" />
                      <span className="text-white/90">{user?.email}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {isEditingJobTitle ? (
                      <div className="flex items-center mt-1">
                        <input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="bg-white/10 border border-white/30 rounded-lg px-3 py-1.5 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="Your job title"
                        />
                        <button 
                          onClick={handleJobTitleUpdate}
                          className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </button>
                        <button 
                          onClick={() => setIsEditingJobTitle(false)}
                          className="ml-1 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5">
                        <p className="text-white/90 font-medium text-sm">{jobTitle}</p>
                        <button 
                          onClick={() => setIsEditingJobTitle(true)}
                          className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          title="Edit job title"
                        >
                          <Edit className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    )}
                    
                    {isEditingCompany ? (
                      <div className="flex items-center mt-1">
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="bg-white/10 border border-white/30 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                          placeholder="Your company"
                        />
                        <button 
                          onClick={handleCompanyUpdate}
                          className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </button>
                        <button 
                          onClick={() => setIsEditingCompany(false)}
                          className="ml-1 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center bg-white/10 rounded-full px-3 py-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-white/70 mr-1.5" />
                        <p className="text-white/90 text-sm">{company}</p>
                        <button 
                          onClick={() => setIsEditingCompany(true)}
                          className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          title="Edit company"
                        >
                          <Edit className="h-3 w-3 text-white" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {uploadError && (
                    <p className="mt-3 text-red-200 text-sm bg-red-500/20 px-3 py-1.5 rounded-lg">{uploadError}</p>
                  )}
                </div>
              </div>
              
              {/* Bio section */}
              <div className="mt-8 pt-6 border-t border-white/10">
                {isEditingBio ? (
                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Write a short bio about yourself..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={handleBioUpdate}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 mr-1 transition-colors"
                      >
                        <Check className="h-5 w-5 text-white" />
                      </button>
                      <button 
                        onClick={() => setIsEditingBio(false)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <X className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center mb-3">
                      <h3 className="text-white font-medium">About</h3>
                      <button 
                        onClick={() => setIsEditingBio(true)}
                        className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title="Edit bio"
                      >
                        <Edit className="h-3.5 w-3.5 text-white" />
                      </button>
                    </div>
                    {bio ? (
                      <p className="text-white/90 leading-relaxed">{bio}</p>
                    ) : (
                      <p className="text-white/70 italic">Add a bio to tell others about yourself...</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-8 bg-gradient-to-b from-white to-gray-50">
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">Profile Complete</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                      <User className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-800">{user?.displayName || "Not set"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                      <Mail className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-800">{user?.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                      <Briefcase className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">Job Title</p>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-800">{jobTitle}</p>
                        <button 
                          onClick={() => setIsEditingJobTitle(true)}
                          className="ml-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          title="Edit job title"
                        >
                          <Edit className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                      <Calendar className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Account Created</p>
                      <p className="font-medium text-gray-800">
                        {user?.metadata?.creationTime 
                          ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : "Not available"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center w-full sm:w-auto px-5 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    {isLoggingOut ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Logging out...
                      </span>
                    ) : (
                      <>
                        <LogOut className="h-5 w-5 mr-2" />
                        Sign Out
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </NavigationGuard>
  );
};

export default ProfileEditPage; 