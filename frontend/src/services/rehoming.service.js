import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  if (!user?.token) {
    console.error('No auth token found in localStorage');
    return {};
  }
  return { Authorization: `Bearer ${user.token}` };
};

// Initialize rehoming process
export const initializeRehoming = async (termsAgreed) => {
  console.log('Initializing rehoming with terms agreed:', termsAgreed);
  console.log('Auth headers:', getAuthHeader());
  
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/initialize`,
      { termsAgreed },
      { headers: getAuthHeader() }
    );
    // Store rehomerId in localStorage for subsequent requests
    localStorage.setItem('rehomerId', response.data.rehomerId);
    console.log('Rehoming initialization response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Rehoming initialization error:', error.response?.data || error.message);
    throw error;
  }
};

// Update pet information for each step
export const updatePetInfo = async (petData) => {
  const rehomerId = localStorage.getItem('rehomerId');
  
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/update-pet-step`,
      {
        rehomerId,
        step: petData.step,
        petData
      },
      { headers: getAuthHeader() }
    );
    // Store petId after first update
    if (response.data.petId) {
      localStorage.setItem('petId', response.data.petId);
    }
    return response.data;
  } catch (error) {
    console.error('Pet info update error:', error.response?.data || error.message);
    throw error;
  }
};

// Upload pet images
export const uploadPetImages = async (formData) => {
  console.log('Uploading pet images:', formData);
  console.log('Auth headers:', getAuthHeader());
  
  try {
    console.log('Uploading pet images:' );
    const response = await axios.post(
      `${API_URL}/rehoming/upload/images`,
      formData,
      {
        headers: {
          ...getAuthHeader(),
         
        }
      }
    );
    console.log('Pet images upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Pet images upload error:', error.response?.data || error.message);
    throw error;
  }
};

// Finalize rehoming process
export const finalizeRehoming = async (petData) => {
  const rehomerId = localStorage.getItem('rehomerId');
  const petId = localStorage.getItem('petId'); // We need to store this after first pet update
  
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/finalize`,
      { rehomerId, petId },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error('Finalize rehoming error:', error.response?.data || error.message);
    throw error;
  }
};
