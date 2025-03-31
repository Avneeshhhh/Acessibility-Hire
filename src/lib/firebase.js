// Import the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Authentication functions
export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

// Profile Update Functions
export const updateUserProfile = async (displayName, photoURL) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    await updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: photoURL || user.photoURL
    });
    
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

export const uploadProfileImage = async (file) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    // Create a storage reference
    const storageRef = ref(storage, `profile_images/${user.uid}`);
    
    // Upload file
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update user profile with new image URL
    await updateProfile(user, {
      photoURL: downloadURL
    });
    
    return { success: true, downloadURL, error: null };
  } catch (error) {
    return { success: false, downloadURL: null, error };
  }
};

// Organization functions
export const createOrganization = async (orgData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    const organizationData = {
      org_name: orgData.org_name,
      org_url: orgData.org_url || '',
      about: orgData.about || '',
      created_at: serverTimestamp(),
      owner_uid: user.uid
    };
    
    const docRef = await addDoc(collection(db, 'user-organization'), organizationData);
    return { 
      success: true, 
      orgId: docRef.id,
      error: null 
    };
  } catch (error) {
    return { 
      success: false, 
      orgId: null,
      error 
    };
  }
};

export const updateOrganization = async (orgId, orgData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    // Get the current org data to verify ownership
    const orgRef = doc(db, 'user-organization', orgId);
    const orgSnap = await getDoc(orgRef);
    
    if (!orgSnap.exists() || orgSnap.data().owner_uid !== user.uid) {
      throw new Error('Permission denied: You do not own this organization');
    }
    
    // Update fields that were provided
    const updateData = {};
    
    if (orgData.org_name) updateData.org_name = orgData.org_name;
    if (orgData.org_url !== undefined) updateData.org_url = orgData.org_url;
    if (orgData.about !== undefined) updateData.about = orgData.about;
    
    await setDoc(orgRef, updateData, { merge: true });
    
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error };
  }
};

export const getUserOrganization = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    const q = query(
      collection(db, 'user-organization'), 
      where('owner_uid', '==', user.uid)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return { 
        success: true, 
        organization: null,
        error: null 
      };
    }
    
    // Get the first organization (assuming a user can have only one org for now)
    const doc = querySnapshot.docs[0];
    const organization = {
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate() // Convert timestamp to Date
    };
    
    return { 
      success: true, 
      organization,
      error: null 
    };
  } catch (error) {
    return { 
      success: false, 
      organization: null,
      error 
    };
  }
};

export const getAllOrganizations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'user-organization'));
    
    const organizations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate() // Convert timestamp to Date
    }));
    
    return { 
      success: true, 
      organizations,
      error: null 
    };
  } catch (error) {
    return { 
      success: false, 
      organizations: [],
      error 
    };
  }
};

// Job post functions
export const createJobPost = async (jobData) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    // Get user's organization
    const { organization } = await getUserOrganization();
    if (!organization) {
      throw new Error('You must create an organization before posting a job');
    }
    
    const jobPostData = {
      title: jobData.title,
      desc: jobData.desc,
      location: jobData.location,
      salary: jobData.salary,
      created_at: serverTimestamp(),
      orgId: organization.id,
      userId: user.uid // For additional security
    };
    
    const docRef = await addDoc(collection(db, 'jobpost'), jobPostData);
    return { 
      success: true, 
      jobId: docRef.id,
      error: null 
    };
  } catch (error) {
    return { 
      success: false, 
      jobId: null,
      error 
    };
  }
};

export const getAllJobPosts = async () => {
  try {
    const q = query(
      collection(db, 'jobpost'),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const jobPosts = await Promise.all(querySnapshot.docs.map(async (document) => {
      const jobData = document.data();
      
      // Get the organization details for each job post
      if (!jobData.orgId) {
        return {
          id: document.id,
          ...jobData,
          created_at: jobData.created_at?.toDate(),
          organization: null
        };
      }
      
      try {
        const orgRef = doc(db, 'user-organization', jobData.orgId);
        const orgSnap = await getDoc(orgRef);
        
        return {
          id: document.id,
          ...jobData,
          created_at: jobData.created_at?.toDate(),
          organization: orgSnap.exists() ? {
            id: orgSnap.id,
            org_name: orgSnap.data().org_name,
            org_url: orgSnap.data().org_url
          } : null
        };
      } catch (err) {
        console.error("Error fetching organization:", err);
        return {
          id: document.id,
          ...jobData,
          created_at: jobData.created_at?.toDate(),
          organization: null
        };
      }
    }));
    
    return { 
      success: true, 
      jobPosts,
      error: null 
    };
  } catch (error) {
    console.error("getAllJobPosts error:", error);
    return { 
      success: false, 
      jobPosts: [],
      error: error.message || "Failed to fetch job posts" 
    };
  }
};

export const getUserJobPosts = async () => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    
    // Get user's organization
    const { organization } = await getUserOrganization();
    if (!organization) {
      return { 
        success: true, 
        jobPosts: [],
        error: null 
      };
    }
    
    // Get jobs posted by the user's organization
    const q = query(
      collection(db, 'jobpost'),
      where('orgId', '==', organization.id),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const jobPosts = querySnapshot.docs.map(document => ({
      id: document.id,
      ...document.data(),
      created_at: document.data().created_at?.toDate(),
      organization
    }));
    
    return { 
      success: true, 
      jobPosts,
      error: null 
    };
  } catch (error) {
    console.error("getUserJobPosts error:", error);
    return { 
      success: false, 
      jobPosts: [],
      error: error.message || "Failed to fetch your job posts" 
    };
  }
};

export const getJobById = async (jobId) => {
  try {
    if (!jobId) throw new Error('Job ID is required');
    
    // Get the job document
    const jobRef = doc(db, 'jobpost', jobId);
    const jobSnap = await getDoc(jobRef);
    
    if (!jobSnap.exists()) {
      return { 
        success: false, 
        job: null,
        error: 'Job not found' 
      };
    }
    
    const jobData = jobSnap.data();
    
    // Get the organization details
    let organization = null;
    
    try {
      if (jobData.orgId) {
        const orgRef = doc(db, 'user-organization', jobData.orgId);
        const orgSnap = await getDoc(orgRef);
        
        if (orgSnap.exists()) {
          organization = {
            id: orgSnap.id,
            org_name: orgSnap.data().org_name,
            org_url: orgSnap.data().org_url || '',
            about: orgSnap.data().about || ''
          };
        }
      }
    } catch (orgError) {
      console.error("Error fetching organization details:", orgError);
      // Continue without organization details rather than failing
    }
    
    const job = {
      id: jobSnap.id,
      ...jobData,
      created_at: jobData.created_at?.toDate(),
      organization
    };
    
    return { 
      success: true, 
      job,
      error: null 
    };
  } catch (error) {
    console.error("getJobById error:", error);
    return { 
      success: false, 
      job: null,
      error: error.message || "Failed to fetch job details" 
    };
  }
};

// Export auth for custom hooks
export { auth, storage, db }; 