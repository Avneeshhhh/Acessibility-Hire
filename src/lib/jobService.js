import { getFirestore, collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { auth } from './firebase';

// Initialize Firestore
const db = getFirestore();
const jobsCollection = collection(db, 'jobs');

/**
 * Add a new job to the jobs collection
 * @param {Object} jobData - Job data to be added
 * @returns {Promise<string>} - ID of the newly created job
 */
export const addJob = async (jobData) => {
  try {
    const jobRef = await addDoc(jobsCollection, jobData);
    return jobRef.id;
  } catch (error) {
    console.error('Error adding job:', error);
    throw error;
  }
};

/**
 * Get all jobs
 * @param {number} limit - Maximum number of jobs to retrieve
 * @returns {Promise<Array>} - Array of job objects
 */
export const getAllJobs = async (limitCount = 100) => {
  try {
    const q = query(jobsCollection, orderBy('createdAt', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting jobs:', error);
    throw error;
  }
};

/**
 * Get jobs posted by a specific user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of job objects
 */
export const getJobsByUser = async (userId) => {
  try {
    const q = query(
      jobsCollection, 
      where('postedBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user jobs:', error);
    throw error;
  }
};

/**
 * Get a specific job by ID
 * @param {string} jobId - Job ID
 * @returns {Promise<Object|null>} - Job object or null if not found
 */
export const getJobById = async (jobId) => {
  try {
    const jobDoc = await getDoc(doc(jobsCollection, jobId));
    
    if (jobDoc.exists()) {
      return {
        id: jobDoc.id,
        ...jobDoc.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting job:', error);
    throw error;
  }
};

/**
 * Update an existing job
 * @param {string} jobId - Job ID to update
 * @param {Object} jobData - Updated job data
 * @returns {Promise<void>}
 */
export const updateJob = async (jobId, jobData) => {
  try {
    await updateDoc(doc(jobsCollection, jobId), jobData);
  } catch (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

/**
 * Delete a job
 * @param {string} jobId - Job ID to delete
 * @returns {Promise<void>}
 */
export const deleteJob = async (jobId) => {
  try {
    await deleteDoc(doc(jobsCollection, jobId));
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

/**
 * Search jobs by keyword in title, company, or description
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} - Array of job objects
 */
export const searchJobs = async (keyword) => {
  try {
    // Get all jobs (in a production app, you'd use a proper search service)
    const jobs = await getAllJobs();
    
    // Filter jobs based on keyword (case insensitive)
    const lowerKeyword = keyword.toLowerCase();
    return jobs.filter(job => 
      job.title.toLowerCase().includes(lowerKeyword) ||
      job.company.toLowerCase().includes(lowerKeyword) ||
      job.description.toLowerCase().includes(lowerKeyword) ||
      job.location.toLowerCase().includes(lowerKeyword)
    );
  } catch (error) {
    console.error('Error searching jobs:', error);
    throw error;
  }
};

/**
 * Filter jobs by different criteria
 * @param {Object} filters - Object containing filter criteria
 * @returns {Promise<Array>} - Array of filtered job objects
 */
export const filterJobs = async (filters = {}) => {
  try {
    const jobs = await getAllJobs();
    
    return jobs.filter(job => {
      // Filter by job type
      if (filters.jobType && job.jobType !== filters.jobType) {
        return false;
      }
      
      // Filter by location
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by accessibility
      if (filters.isAccessible && !job.isAccessible) {
        return false;
      }
      
      // Filter by salary range
      if (filters.salaryMin && Number(job.salaryMin) < Number(filters.salaryMin)) {
        return false;
      }
      
      if (filters.salaryMax && Number(job.salaryMax) > Number(filters.salaryMax)) {
        return false;
      }
      
      return true;
    });
  } catch (error) {
    console.error('Error filtering jobs:', error);
    throw error;
  }
}; 