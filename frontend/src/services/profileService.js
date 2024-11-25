import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

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

// Function to update user profile with image support
const updateProfile = async (userData, profilePicture = null) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Don't send password updates through this function
    if (userData.password || userData.currentPassword || userData.newPassword) {
      throw new Error('Please use updatePassword function for password changes');
    }

    const formData = new FormData();
    
    // Append user data
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });

    // Append profile picture if provided
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`${API_URL}/profile`, formData, config);
    
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

    const response = await axios.put(
      `${API_URL}/change-password`,
      passwordData,
      config
    );

    return {
      success: true,
      message: response.data.message || 'Password updated successfully'
    };
  } catch (error) {
    console.error('Password update error:', error);
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};

export { getProfile, updateProfile, updatePassword };
