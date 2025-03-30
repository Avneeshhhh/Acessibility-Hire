"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { logOut, uploadProfileImage, updateUserProfile } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import NavigationGuard from '@/components/custom/Auth/NavigationGuard';
import NavBar from '@/components/custom/Navigation/NavBar';
import Footer from '@/components/custom/Navigation/Footer';
import { User, Mail, LogOut, Camera, Calendar, Edit, Check, X, AtSign, Briefcase } from 'lucide-react';
import Image from 'next/image';

const ProfilePage = () => {
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

  // Check if user is using email/password and doesn't have a complete profile
  const isProfileIncomplete = user && !user.photoURL;

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
  // For this demo, we'll just update the state
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

  // Show incomplete profile warning for email/password users without a profile image
  if (isProfileIncomplete) {
    return (
      <NavigationGuard requireAuth={true}>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
          <NavBar />
          
          <main className="max-w-4xl mx-auto px-4 py-12 mt-14">
            <div className="bg-white shadow rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-12 text-white">
                <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
                <p className="opacity-90">Please add a profile picture and set your name to enhance your experience.</p>
              </div>
              
              <div className="p-8">
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="relative mb-6 md:mb-0 md:mr-8">
                      <div className={`h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden relative ${isUploading ? 'opacity-50' : ''}`}>
                        {profileImage ? (
                          <Image 
                            src={profileImage}
                            alt={displayName}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-orange-100 flex items-center justify-center">
                            <User className="h-16 w-16 text-orange-500" />
                          </div>
                        )}
                        
                        {isUploading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-2 right-2 bg-white rounded-full p-2.5 shadow-md hover:bg-gray-100 transition-colors"
                        title="Upload profile picture"
                      >
                        <Camera className="h-5 w-5 text-orange-600" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                      </button>
                    </div>
                    
                    <div className="text-center md:text-left">
                      {isEditingName ? (
                        <div className="flex items-center mb-1">
                          <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-gray-900 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                          <button 
                            onClick={handleNameUpdate}
                            className="ml-2 p-1 rounded-full bg-orange-100 hover:bg-orange-200"
                          >
                            <Check className="h-4 w-4 text-orange-600" />
                          </button>
                          <button 
                            onClick={() => setIsEditingName(false)}
                            className="ml-1 p-1 rounded-full bg-orange-100 hover:bg-orange-200"
                          >
                            <X className="h-4 w-4 text-orange-600" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center md:justify-start mb-1">
                          <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
                          <button 
                            onClick={() => setIsEditingName(true)}
                            className="ml-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <Edit className="h-3.5 w-3.5 text-gray-600" />
                          </button>
                        </div>
                      )}
                      <p className="text-gray-600">{user?.email}</p>
                      
                      <div className="mt-4">
                        <p className="text-center md:text-left text-orange-600 font-medium">Please add a profile picture to complete your profile.</p>
                      </div>
                    </div>
                  </div>
                  
                  {uploadError && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                      <p className="text-red-600">{uploadError}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
          
          <Footer />
        </div>
      </NavigationGuard>
    );
  }

  return (
    <NavigationGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <NavBar />
        
        <main className="max-w-4xl mx-auto px-4 py-12 mt-14">
          <div className="bg-white shadow rounded-2xl overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-12 text-white relative">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <div className="relative mb-6 md:mb-0 md:mr-8">
                  <div className={`h-28 w-28 rounded-full border-4 border-white overflow-hidden relative ${isUploading ? 'opacity-50' : ''}`}>
                    {profileImage ? (
                      <Image 
                        src={profileImage}
                        alt={displayName}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-indigo-300 flex items-center justify-center">
                        <User className="h-14 w-14 text-indigo-700" />
                      </div>
                    )}
                    
                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Image upload button */}
                  <button 
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors"
                    title="Upload profile picture"
                  >
                    <Camera className="h-4 w-4 text-indigo-600" />
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
                    <div className="flex items-center mb-1 justify-center md:justify-start">
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-xl font-bold focus:outline-none"
                      />
                      <button 
                        onClick={handleNameUpdate}
                        className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <Check className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        onClick={() => setIsEditingName(false)}
                        className="ml-1 p-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center mb-1 justify-center md:justify-start">
                      <h1 className="text-3xl font-bold">{displayName}</h1>
                      <button 
                        onClick={() => setIsEditingName(true)}
                        className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30"
                        title="Edit name"
                      >
                        <Edit className="h-3.5 w-3.5 text-white" />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center md:justify-start mb-1">
                    <AtSign className="h-4 w-4 text-white/70 mr-1" />
                    <p className="opacity-80 text-sm">{user?.email}</p>
                  </div>
                  
                  {isEditingJobTitle ? (
                    <div className="flex items-center mt-3 justify-center md:justify-start">
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm font-medium focus:outline-none"
                        placeholder="Your job title"
                      />
                      <button 
                        onClick={handleJobTitleUpdate}
                        className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <Check className="h-3 w-3 text-white" />
                      </button>
                      <button 
                        onClick={() => setIsEditingJobTitle(false)}
                        className="ml-1 p-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center mt-3 justify-center md:justify-start">
                      <p className="text-white/90 font-medium">{jobTitle}</p>
                      <button 
                        onClick={() => setIsEditingJobTitle(true)}
                        className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30"
                        title="Edit job title"
                      >
                        <Edit className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  )}
                  
                  {isEditingCompany ? (
                    <div className="flex items-center mt-1 justify-center md:justify-start">
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="bg-white/20 border border-white/30 rounded px-2 py-1 text-white text-sm focus:outline-none"
                        placeholder="Your company"
                      />
                      <button 
                        onClick={handleCompanyUpdate}
                        className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <Check className="h-3 w-3 text-white" />
                      </button>
                      <button 
                        onClick={() => setIsEditingCompany(false)}
                        className="ml-1 p-1 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center mt-1 justify-center md:justify-start">
                      <Briefcase className="h-3 w-3 text-white/70 mr-1" />
                      <p className="text-white/80 text-sm">{company}</p>
                      <button 
                        onClick={() => setIsEditingCompany(true)}
                        className="ml-2 p-0.5 rounded-full bg-white/20 hover:bg-white/30"
                        title="Edit company"
                      >
                        <Edit className="h-2.5 w-2.5 text-white" />
                      </button>
                    </div>
                  )}
                  
                  {uploadError && (
                    <p className="mt-2 text-red-200 text-sm bg-red-500/20 px-2 py-1 rounded">{uploadError}</p>
                  )}
                </div>
              </div>
              
              {/* Bio section */}
              <div className="mt-6 pt-6 border-t border-white/20">
                {isEditingBio ? (
                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-white/20 border border-white/30 rounded px-3 py-2 text-white focus:outline-none"
                      placeholder="Write a short bio..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button 
                        onClick={handleBioUpdate}
                        className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 mr-1"
                      >
                        <Check className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        onClick={() => setIsEditingBio(false)}
                        className="p-1.5 rounded-full bg-white/20 hover:bg-white/30"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <h3 className="text-white font-medium">About</h3>
                      <button 
                        onClick={() => setIsEditingBio(true)}
                        className="ml-2 p-1 rounded-full bg-white/20 hover:bg-white/30"
                        title="Edit bio"
                      >
                        <Edit className="h-3 w-3 text-white" />
                      </button>
                    </div>
                    {bio ? (
                      <p className="text-white/90">{bio}</p>
                    ) : (
                      <p className="text-white/70 italic">Add a bio to tell others about yourself...</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Content */}
            <div className="p-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user?.displayName || "Not set"}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <Mail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Title</p>
                    <div className="flex items-center">
                      <p className="font-medium">{jobTitle}</p>
                      <button 
                        onClick={() => setIsEditingJobTitle(true)}
                        className="ml-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        title="Edit job title"
                      >
                        <Edit className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="font-medium">
                      {user?.metadata?.creationTime 
                        ? new Date(user.metadata.creationTime).toLocaleDateString() 
                        : "Not available"}
                    </p>
                  </div>
                </div>
                
                <div className="pt-6">
                  <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center w-full px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {isLoggingOut ? (
                      <span>Logging out...</span>
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

export default ProfilePage; 