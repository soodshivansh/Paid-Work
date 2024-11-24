import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

// Function to upload image to Cloudinary
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'pet4home');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload',
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error('Failed to upload image: ' + (error.response?.data?.message || error.message));
  }
};

// Function to get user profile
const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${API_URL}/profile`, config);
    return {
      success: true,
      user: response.data
    };
  } catch (error) {
    console.error('Get profile error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get profile');
  }
};

// Function to update user profile
const updateProfile = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Don't send password updates through this function
    if (userData.password || userData.currentPassword || userData.newPassword) {
      throw new Error('Please use updatePassword function for password changes');
    }

    const response = await axios.put(`${API_URL}/profile`, userData, config);
    
    if (response.data) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const updatedUserInfo = { ...userInfo, ...response.data };
      localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      
      return {
        success: true,
        message: 'Profile updated successfully',
        user: response.data
      };
    }

    return {
      success: false,
      message: 'Failed to update profile'
    };
  } catch (error) {
    console.error('Profile update error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
};

// Function to update password
const updatePassword = async (passwordData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    // Use a separate endpoint for password updates
    const response = await axios.put(`${API_URL}/change-password`, {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    }, config);
    
    if (response.data) {
      return {
        success: true,
        message: 'Password updated successfully'
      };
    }

    return {
      success: false,
      message: 'Failed to update password'
    };
  } catch (error) {
    console.error('Password update error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};

export { getProfile, updateProfile, updatePassword, uploadImage };
