import asyncHandler from "express-async-handler";
import User from '../Models/user.models.js';
import generateToken from "../utils/generateToken.js"; 
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get full URL for profile picture
const getProfilePictureUrl = (req, filename) => {
  if (!filename) {
    return "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  }
  
  if (filename.startsWith('http')) {
    return filename;
  }

  // Ensure the path starts with /uploads/user/
  const relativePath = filename.startsWith('/uploads/user/') 
    ? filename 
    : path.join('/uploads/user/', path.basename(filename));

  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${relativePath}`;
};

// Helper function to get relative path for storing in database
const getRelativePath = (filename) => {
  if (!filename) return undefined;
  if (filename.startsWith('http')) return filename;
  return path.join('/uploads/user/', path.basename(filename)).replace(/\\/g, '/');
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, country, state, zipCode } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Handle profile picture
    let profilePicture = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    if (req.file) {
      profilePicture = getRelativePath(req.file.filename);
      console.log('Storing profile picture path:', profilePicture);
    }

    const user = await User.create({
      name,
      email,
      password,
      country,
      state,
      zipCode,
      profilePicture
    });

    console.log('Created user with profile picture:', user.profilePicture);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: getProfilePictureUrl(req, user.profilePicture),
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(400);
    throw error;
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log('Found user:', user ? user.email : 'not found');
    if (user) {
      console.log('Profile picture in DB:', user.profilePicture);
    }

    if (user && (await user.matchPassword(password))) {
      const profilePictureUrl = getProfilePictureUrl(req, user.profilePicture);
      console.log('Generated profile picture URL:', profilePictureUrl);

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: profilePictureUrl,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.error('Error in authUser:', error);
    throw error;
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log('Getting user profile. Profile picture in DB:', user?.profilePicture);

    if (user) {
      const profilePictureUrl = getProfilePictureUrl(req, user.profilePicture);
      console.log('Generated profile picture URL:', profilePictureUrl);

      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: profilePictureUrl,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Handle profile picture update
    if (req.file) {
      const relativePath = getRelativePath(req.file.filename);
      user.profilePicture = relativePath;
      console.log('Updated profile picture path:', relativePath);
    }

    // Update other fields if provided
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.state) user.state = req.body.state;
    if (req.body.zipCode) user.zipCode = req.body.zipCode;
    if (req.body.country) user.country = req.body.country;

    const updatedUser = await user.save();

    // Convert profile picture path to full URL before sending response
    const userResponse = updatedUser.toObject();
    userResponse.profilePicture = getProfilePictureUrl(req, userResponse.profilePicture);

    res.json(userResponse);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(400);
    throw error;
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user && (await user.matchPassword(req.body.currentPassword))) {
    user.password = req.body.newPassword;
    await user.save();
    res.json({ message: "Password updated" });
  } else {
    res.status(401);
    throw new Error("Invalid current password");
  }
});

export { registerUser, authUser, getUserProfile, updateUserProfile, changePassword };
