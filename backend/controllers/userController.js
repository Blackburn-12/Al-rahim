import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    employeeCode,
    department,
    designation,
    section,
    contact,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    employeeCode,
    department,
    designation,
    section,
    contact,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      employeeCode: user.employeeCode,
      department: user.department,
      designation: user.designation,
      section: user.section,
      contact: user.contact,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      employeeCode: user.employeeCode,
      department: user.department,
      designation: user.designation,
      section: user.section,
      contact: user.contact,
      isAllowed: user.isAllowed,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const userRefetch = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      employeeCode: user.employeeCode,
      department: user.department,
      designation: user.designation,
      section: user.section,
      contact: user.contact,
      isAllowed: user.isAllowed,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user password
// @route   PUT /api/users/update-password
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { email, employeeCode, newPassword } = req.body;

  // Validate input
  if (!email || !employeeCode || !newPassword) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find user by email and employeeCode
  const user = await User.findOne({ email, employeeCode });

  if (user) {
    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Optionally, generate a new token or notify the user (not shown in this example)
    const token = generateToken(user._id); // Assuming you have a token generation utility
    res.status(200).json({
      message: "Password updated successfully",
      token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or employee code");
  }
});

// @desc    Logout user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  // Optionally, handle token invalidation or blacklisting here
  // e.g., Add the token to a blacklist or remove it from a database

  // Response to client
  res.status(200).json({ message: "User logged out successfully" });
});
export { registerUser, loginUser, userRefetch, logoutUser, resetPassword };
