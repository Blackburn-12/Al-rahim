import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Notification from "../models/Notification.js"
import dotenv from "dotenv";
dotenv.config();
// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new admin
// @route   POST /api/admins/register
// @access  Private (only accessible by existing admins)
const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    email,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Authenticate admin & get token
// @route   POST /api/admins/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get admin profile
// @route   GET /api/admins/profile
// @access  Private
const adminRefetch = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id);

  if (admin) {
    res.json({
      _id: admin._id,
      email: admin.email,
      role: admin.role,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// @desc    Fetch all users
// @route   GET /api/admins/users
// @access  Private (Admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.json(users);
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

// @desc    Edit user information by admin
// @route   PUT /api/admins/user/:id
// @access  Private
const editUserInfo = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.employeeCode = req.body.employeeCode || user.employeeCode;
    user.department = req.body.department || user.department;
    user.designation = req.body.designation || user.designation;
    user.section = req.body.section || user.section;
    user.contact = req.body.contact || user.contact;
    user.isAllowed =
      req.body.isAllowed !== undefined ? req.body.isAllowed : user.isAllowed;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      employeeCode: updatedUser.employeeCode,
      department: updatedUser.department,
      designation: updatedUser.designation,
      section: updatedUser.section,
      contact: updatedUser.contact,
      isAllowed: updatedUser.isAllowed,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Fetch all posts (Admin only)
// @route   GET /api/admins/posts
// @access  Private (Admin only)
const fetchAllPostsAdmin = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("user", "name email");
  res.json(posts);
});

// @desc    Fetch a single post by ID (Admin only)
// @route   GET /api/admins/posts/:id
// @access  Private (Admin only)
const fetchPostByIdAdmin = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "name email employeeCode department") // Populate the user field with specific details
    .populate("updatedBy", "email role") // Populate the updatedBy field with specific details
    .exec();

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Edit an existing post (Admin only)
// @route   PUT /api/admins/posts/:id
// @access  Private (Admin only)
const editPostAdmin = asyncHandler(async (req, res) => {
  console.log("Received body:", req.body);
  console.log("Request ID:", req.params.id);

  try {
    const updateFields = {
      updatedAt: Date.now(),
      updatedBy: req.admin._id,
      updatedByEmail: req.admin.email, // Include admin email
      updatedByRole: req.admin.role, // Include admin role
    };

    if (req.body.eventSelection) {
      updateFields["eventSelection.rootCause"] =
        req.body.eventSelection.rootCause;
      updateFields["eventSelection.causeCategory"] =
        req.body.eventSelection.causeCategory;
    }

    if (req.body.productDetails) {
      updateFields["productDetails.customer"] =
        req.body.productDetails.customer;
      updateFields["productDetails.brand"] = req.body.productDetails.brand;
      updateFields["productDetails.productType"] =
        req.body.productDetails.productType;
      updateFields["productDetails.towelType"] =
        req.body.productDetails.towelType;
      updateFields["productDetails.article"] = req.body.productDetails.article;
      updateFields["productDetails.size"] = req.body.productDetails.size;
      updateFields["productDetails.color"] = req.body.productDetails.color;
      updateFields["productDetails.design"] = req.body.productDetails.design;
      updateFields["productDetails.productId"] =
        req.body.productDetails.productId;
      updateFields["productDetails.sos"] = req.body.productDetails.sos;
      updateFields["productDetails.customerPO"] =
        req.body.productDetails.customerPO;
    }

    if (req.body.problemDiscussion) {
      updateFields["problemDiscussion.dateOccurred"] =
        req.body.problemDiscussion.dateOccurred;
      updateFields["problemDiscussion.problemStatement"] =
        req.body.problemDiscussion.problemStatement;
      updateFields["problemDiscussion.containmentAction"] =
        req.body.problemDiscussion.containmentAction;
      updateFields["problemDiscussion.memberRCA"] =
        req.body.problemDiscussion.memberRCA;
    }

    if (req.body.rcaFor6Ms) {
      updateFields["rcaFor6Ms.method"] = req.body.rcaFor6Ms.method;
      updateFields["rcaFor6Ms.material"] = req.body.rcaFor6Ms.material;
      updateFields["rcaFor6Ms.machine"] = req.body.rcaFor6Ms.machine;
      updateFields["rcaFor6Ms.manpower"] = req.body.rcaFor6Ms.manpower;
      updateFields["rcaFor6Ms.measurement"] = req.body.rcaFor6Ms.measurement;
      updateFields["rcaFor6Ms.milieu"] = req.body.rcaFor6Ms.milieu;
    }

    if (req.body.correctiveAction) {
      updateFields["correctiveAction.detection"] =
        req.body.correctiveAction.detection;
      updateFields["correctiveAction.occurrence"] =
        req.body.correctiveAction.occurrence;
      updateFields["correctiveAction.dateOccurred"] =
        req.body.correctiveAction.dateOccurred;
    }

    if (req.body.preventiveAction) {
      updateFields["preventiveAction.detection"] =
        req.body.preventiveAction.detection;
      updateFields["preventiveAction.occurrence"] =
        req.body.preventiveAction.occurrence;
      updateFields["preventiveAction.dateOccurred"] =
        req.body.preventiveAction.dateOccurred;
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      res.status(404);
      throw new Error("Post not found");
    }

    console.log("Updated post:", updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500);
    throw new Error("Error updating post");
  }
});

// @desc    Delete a post (Admin only)
// @route   DELETE /api/admins/posts/:id
// @access  Private (Admin only)
const deletePostAdmin = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (post) {
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Fetch approved posts
// @route   GET /api/posts/approved
// @access  Private
const fetchApprovedPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: true }).populate(
      "user",
      "name email"
    );
    res.json(posts);
  } catch (error) {
    console.error("Error fetching approved posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// @desc    Fetch unapproved posts
// @route   GET /api/posts/unapproved
// @access  Private
const fetchUnapprovedPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: false }).populate(
      "user",
      "name email"
    );
    res.json(posts);
  } catch (error) {
    console.error("Error fetching unapproved posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// @desc    Get total number of posts created
// @route   GET /api/posts/count
// @access  Private (Admin only)
const getTotalPostsCount = asyncHandler(async (req, res) => {
  const totalPosts = await Post.countDocuments({});
  res.json({ totalPosts });
});



const approvePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the post by ID and populate the user field to get the user ID
  const post = await Post.findById(id).populate('user', '_id');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  post.isApproved = true;
  const updatedPost = await post.save();

  if (updatedPost) {
    // Create a notification for the user who created the post
    const notification = new Notification({
      user: post.user._id, // Ensure this is the user ID
      post: post._id, // Add the post ID
      type: 'postApproved', // Add the type field
      message: `Your post "${post.capaNumber}" has been approved and is ready for further updates.`,
      isRead: false, // Notification is unread by default
    });
    await notification.save();

    res.json(updatedPost);
  } else {
    res.status(400);
    throw new Error('Post not updated');
  }
});


export {
  registerAdmin,
  loginAdmin,
  adminRefetch,
  editUserInfo,
  getAllUsers,
  fetchAllPostsAdmin,
  fetchPostByIdAdmin,
  editPostAdmin,
  deletePostAdmin,
  getTotalPostsCount,
  fetchApprovedPosts,
  fetchUnapprovedPosts,
  approvePost
};
