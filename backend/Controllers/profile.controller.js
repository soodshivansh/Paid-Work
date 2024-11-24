import asyncHandler from 'express-async-handler';
import User from '../Models/user.models.js';
import bcrypt from 'bcryptjs';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  try {
    // First, verify user exists
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Create an object with only the fields that are provided
    const updateFields = {};
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.phone) updateFields.phone = req.body.phone;
    if (req.body.state) updateFields.state = req.body.state;
    if (req.body.zipCode) updateFields.zipCode = req.body.zipCode;
    if (req.body.profilePic) updateFields.profilePic = req.body.profilePic;

    // Attempt to update the user
    let updatedUser = null;
    try {
      updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updateFields },
        { 
          new: true, 
          runValidators: true,
          context: 'query'
        }
      );
    } catch (updateError) {
      // Handle validation errors
      if (updateError.name === 'ValidationError') {
        const validationErrors = {};
        Object.keys(updateError.errors).forEach(key => {
          validationErrors[key] = updateError.errors[key].message;
        });
        return res.status(400).json({
          message: 'Profile update failed',
          errors: validationErrors,
          success: false
        });
      }
      throw updateError; // Re-throw other errors
    }

    // Verify the update was successful by checking the database
    const verifyUpdate = await User.findById(req.user._id);
    const updateSuccessful = Object.keys(updateFields).every(field => 
      verifyUpdate[field] === updateFields[field]
    );

    if (!updateSuccessful) {
      return res.status(500).json({
        message: 'Profile update failed to save to database',
        success: false
      });
    }

    // If we reach here, update was successful
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: verifyUpdate._id,
        name: verifyUpdate.name,
        email: verifyUpdate.email,
        phone: verifyUpdate.phone,
        state: verifyUpdate.state,
        zipCode: verifyUpdate.zipCode,
        profilePic: verifyUpdate.profilePic,
      }
    });

  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({
      message: error.message || 'Error updating profile',
      success: false,
      error: {
        type: error.name,
        details: error.message
      }
    });
  }
});

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
const changePassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false
      });
    }

    // Validate current password
    const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Current password is incorrect',
        success: false
      });
    }

    // Validate new password format
    if (!req.body.newPassword.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      return res.status(400).json({
        message: 'New password must contain at least one uppercase letter, one number, and one special character',
        success: false
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // Verify password was updated
    const verifyUser = await User.findById(req.user._id);
    const passwordUpdateSuccessful = await bcrypt.compare(req.body.newPassword, verifyUser.password);

    if (!passwordUpdateSuccessful) {
      return res.status(500).json({
        message: 'Password update failed to save to database',
        success: false
      });
    }

    res.json({
      message: 'Password updated successfully',
      success: true
    });

  } catch (error) {
    console.error('Password Change Error:', error);
    res.status(500).json({
      message: error.message || 'Error changing password',
      success: false,
      error: {
        type: error.name,
        details: error.message
      }
    });
  }
});

export { updateProfile, changePassword };
