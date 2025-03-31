"use client";
import { useState, useEffect } from 'react';
import { createOrganization, updateOrganization, getUserOrganization } from '@/lib/firebase';
import { useAuth } from '@/lib/authContext';
import { 
  Building2, 
  Globe, 
  FileText, 
  Plus, 
  CheckCircle, 
  Edit, 
  Check, 
  X, 
  Calendar 
} from 'lucide-react';

const OrganizationManager = () => {
  const { user } = useAuth();
  const [organization, setOrganization] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form fields
  const [orgName, setOrgName] = useState('');
  const [orgUrl, setOrgUrl] = useState('');
  const [about, setAbout] = useState('');

  const fetchUserOrganization = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const { success, organization, error } = await getUserOrganization();
      if (success && organization) {
        setOrganization(organization);
        // Populate form fields
        setOrgName(organization.org_name || '');
        setOrgUrl(organization.org_url || '');
        setAbout(organization.about || '');
      } else if (error) {
        console.error("Error fetching organization:", error);
        setError('Failed to load organization. Please try again.');
      }
    } catch (err) {
      console.error("Error fetching organization:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrganization();
  }, [user]);

  const handleCreateOrganization = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    if (!orgName.trim()) {
      setError('Organization name is required');
      setIsLoading(false);
      return;
    }
    
    try {
      const { success, orgId, error } = await createOrganization({
        org_name: orgName,
        org_url: orgUrl,
        about
      });
      
      if (success) {
        setSuccess('Organization created successfully!');
        fetchUserOrganization(); // Refresh organization data
      } else {
        console.error("Error creating organization:", error);
        setError('Failed to create organization. Please try again.');
      }
    } catch (err) {
      console.error("Error creating organization:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateOrganization = async (e) => {
    e.preventDefault();
    if (!organization?.id) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    if (!orgName.trim()) {
      setError('Organization name is required');
      setIsLoading(false);
      return;
    }
    
    try {
      const { success, error } = await updateOrganization(organization.id, {
        org_name: orgName,
        org_url: orgUrl,
        about
      });
      
      if (success) {
        setSuccess('Organization updated successfully!');
        fetchUserOrganization(); // Refresh organization data
        setIsEditing(false);
      } else {
        console.error("Error updating organization:", error);
        setError('Failed to update organization. Please try again.');
      }
    } catch (err) {
      console.error("Error updating organization:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !organization) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-md">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (!organization) {
    // Organization creation form
    return (
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Organization</h2>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-100">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-100">
            {success}
          </div>
        )}
        
        <form onSubmit={handleCreateOrganization} className="space-y-5">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Acme Corporation"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="orgUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="orgUrl"
                value={orgUrl}
                onChange={(e) => setOrgUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://www.example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              About Your Organization
            </label>
            <div className="relative rounded-md">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about your organization..."
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Organization"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  // Organization view and edit mode
  return (
    <div className="bg-white rounded-xl p-6 md:p-8 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Organization</h2>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center text-sm"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              // Reset form values to current organization
              setOrgName(organization.org_name || '');
              setOrgUrl(organization.org_url || '');
              setAbout(organization.about || '');
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md flex items-center text-sm"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </button>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-100 flex items-center">
          <Check className="h-5 w-5 mr-2" />
          {success}
        </div>
      )}
      
      {isEditing ? (
        // Edit form
        <form onSubmit={handleUpdateOrganization} className="space-y-5">
          <div>
            <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Acme Corporation"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="orgUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <div className="relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="orgUrl"
                value={orgUrl}
                onChange={(e) => setOrgUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://www.example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
              About Your Organization
            </label>
            <div className="relative rounded-md">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tell us about your organization..."
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        // View mode
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <Building2 className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Organization Name</p>
                <p className="text-lg font-semibold text-gray-800">{organization.org_name}</p>
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Website URL</p>
                {organization.org_url ? (
                  <a 
                    href={organization.org_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    {organization.org_url}
                  </a>
                ) : (
                  <p className="text-gray-500 italic">Not specified</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <FileText className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">About</p>
                {organization.about ? (
                  <p className="text-gray-700 whitespace-pre-wrap">{organization.about}</p>
                ) : (
                  <p className="text-gray-500 italic">No description provided</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500 font-medium">Created</p>
                <p className="text-gray-700">
                  {organization.created_at instanceof Date
                    ? organization.created_at.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Unknown date'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationManager; 