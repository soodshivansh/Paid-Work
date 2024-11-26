import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaUser, FaEye, FaEyeSlash, FaCamera, FaCheck, FaTimes, FaPaw } from 'react-icons/fa';
import { getProfile, updateProfile, updatePassword } from '../../services/profileService';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    state: '',
    pincode: '',
    country: 'India',
  });
  const [tempValue, setTempValue] = useState('');

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await getProfile();
      if (response.success && response.user) {
        const user = response.user;
        setFormData(prevState => ({
          ...prevState,
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          state: user.state || '',
          pincode: user.zipCode || '',
          country: user.country || 'India',
        }));
        setProfilePic(user.profilePicture);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error(error.message || 'Failed to load user data');
      if (error.message.includes('Authentication')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [navigate]);

  const handleEditField = (field) => {
    setEditingField(field);
    setTempValue(formData[field]);
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleSaveField = async (field) => {
    if (!tempValue.trim() && field !== 'phone') {
      toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`);
      return;
    }

    setIsLoading(true);
    try {
      let updateData = {};
      
      // Handle state and pincode together
      if (field === 'state' || field === 'pincode') {
        updateData = {
          state: field === 'state' ? tempValue : formData.state,
          zipCode: field === 'pincode' ? tempValue : formData.pincode
        };
      } else {
        updateData = {
          [field]: tempValue,
        };
      }

      const response = await updateProfile(updateData);
      if (response.success) {
        setFormData(prev => ({
          ...prev,
          [field]: tempValue,
        }));
        toast.success('Profile updated successfully');
        setEditingField(null);
        setTempValue('');
      } else {
        toast.error(response.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update field error:', error);
      toast.error(error.message || 'Failed to update field');
      if (error.message.includes('Authentication')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error('All password fields are required');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const response = await updatePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        toast.success(response.message || 'Password updated successfully');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
        setShowPasswordSection(false);
      } else {
        toast.error(response.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast.error(error.message || 'Failed to update password');
      if (error.message.includes('Authentication')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setIsLoading(true);
      const response = await updateProfile({}, file);
      
      if (response.success && response.user) {
        setProfilePic(response.user.profilePicture);
        toast.success('Profile picture updated successfully');
      } else {
        toast.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Profile picture update error:', error);
      toast.error(error.message || 'Failed to update profile picture');
      if (error.message.includes('Authentication')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleEditStateAndPincode = () => {
    setEditingField('stateAndPincode');
    setTempValue({ state: formData.state, pincode: formData.pincode });
  };
  
  const handleSaveStateAndPincode = async () => {
    const { state, pincode } = tempValue;
    if (!state.trim() || !pincode.trim()) {
      toast.error('State and Pincode cannot be empty');
      return;
    }
  
    setIsLoading(true);
    try {
      const updateData = { state, zipCode: pincode };
      const response = await updateProfile(updateData);
      if (response.success) {
        setFormData(prev => ({ ...prev, state, pincode }));
        toast.success('Profile updated successfully');
        setEditingField(null);
        setTempValue('');
      } else {
        toast.error(response.message || 'Update failed');
      }
    } catch (error) {
      console.error('Update field error:', error);
      toast.error(error.message || 'Failed to update field');
      if (error.message.includes('Authentication')) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderField = (field, label, disabled = false) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {editingField === field ? (
          <React.Fragment>
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              disabled={isLoading}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={() => handleSaveField(field)}
              disabled={isLoading}
              className="p-2 text-purple-600 hover:text-purple-700"
            >
              <FaCheck />
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              type="text"
              value={formData[field]}
              disabled
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50"
            />
            {!disabled && (
              <button
                onClick={() => handleEditField(field)}
                disabled={isLoading}
                className="p-2 text-purple-600 hover:text-purple-700"
              >
                <FaEdit />
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );

  const renderStateAndPincodeFields = () => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        State and Pincode
      </label>
      <div className="flex items-center gap-2">
        {editingField === 'stateAndPincode' ? (
          <React.Fragment>
            <input
              type="text"
              value={tempValue.state}
              onChange={(e) => setTempValue(prev => ({ ...prev, state: e.target.value }))}
              disabled={isLoading}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <input
              type="text"
              value={tempValue.pincode}
              onChange={(e) => setTempValue(prev => ({ ...prev, pincode: e.target.value }))}
              disabled={isLoading}
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleSaveStateAndPincode}
              disabled={isLoading}
              className="p-2 text-green-600 hover:text-green-700"
            >
              <FaCheck />
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              type="text"
              value={formData.state}
              disabled
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50"
            />
            <input
              type="text"
              value={formData.pincode}
              disabled
              className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50"
            />
            <button
              onClick={handleEditStateAndPincode}
              disabled={isLoading}
              className="p-2 text-purple-600 hover:text-purple-700"
            >
              <FaEdit />
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 relative">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="text-gray-400 text-4xl" />
                </div>
              )}
            </div>
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
            >
              <FaCamera className="text-white" />
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-4 border-t border-gray-200 pt-6 pb-6">
          {renderField('name', 'Name')}
          {renderField('email', 'Email', true)}
          {renderField('phone', 'Phone')}
          {renderStateAndPincodeFields()}
          {renderField('country', 'Country', true)}
        </div>

        {/* Password Change Section */}
        {!showPasswordSection ? (
          <button
            onClick={() => setShowPasswordSection(true)}
            className="w-full py-2 px-4 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition-colors duration-200"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
            
            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  disabled={isLoading}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                  disabled={isLoading}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  disabled={isLoading}
                  className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordSection(false);
                  setFormData(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  }));
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;