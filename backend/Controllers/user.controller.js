import asyncHandler from "express-async-handler";
import User from '../Models/user.models.js';
import generateToken from "../utils/generateToken.js"; 

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, country, state, zipCode, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Convert isAdmin to boolean explicitly
  const isAdminBoolean = isAdmin === true || isAdmin === "true";

  const user = await User.create({
    name,
    email,
    password,
    country,
    state,
    zipCode,
    isAdmin: isAdminBoolean,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password, isAdmin } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Check if trying to login as admin
    if (isAdmin && !user.isAdmin) {
      res.status(401);
      throw new Error("Not authorized as admin");
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      country: user.country,
      state: user.state,
      zipCode: user.zipCode,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    // Update non-password fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.country) user.country = req.body.country;
    if (req.body.state) user.state = req.body.state;
    if (req.body.zipCode) user.zipCode = req.body.zipCode;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.pic) user.pic = req.body.pic;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      country: updatedUser.country,
      state: updatedUser.state,
      zipCode: updatedUser.zipCode,
      phone: updatedUser.phone,
      pic: updatedUser.pic,
      token: generateToken(updatedUser.id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Verify current password
  if (!(await user.matchPassword(currentPassword))) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  // Update password
  user.password = newPassword;
  await user.save();

  res.json({
    message: "Password updated successfully"
  });
});

// Admin login endpoint
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (!user.isAdmin) {
    res.status(403);
    throw new Error("Not authorized as admin");
  }

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user.id),
  });
});

export {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  adminLogin,
};
