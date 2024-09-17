import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Notification from "../models/Notification.js";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = (io) =>
  asyncHandler(async (req, res) => {
    try {
      const {
        eventSelection,
        productDetails,
        problemDiscussion,
        rcaFor6Ms,
        correctiveAction,
        preventiveAction,
      } = req.body;

      if (
        !eventSelection ||
        !productDetails ||
        !problemDiscussion ||
        !rcaFor6Ms
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create a new post
      const post = new Post({
        user: req.user._id,
        eventSelection,
        productDetails,
        problemDiscussion,
        rcaFor6Ms,
        correctiveAction,
        preventiveAction,
      });

      const createdPost = await post.save();

      // Fetch the admin user with the role 'admin'
      const admin = await Admin.findOne({ role: "admin" });

      if (admin) {
        // Create a notification for the admin
        const notification = new Notification({
          type: "postCreated",
          message: `New CAPA Module Created: CAPA #${createdPost.capaNumber}`,
          user: admin._id,
          post: createdPost._id,
        });

        await notification.save();

        // Emit the notification event via Socket.IO
        io.emit("newPost", createdPost);
      }

      res.status(201).json(createdPost);
    } catch (err) {
      console.error("Error creating post:", err.message);
      res
        .status(400)
        .json({ message: "Post creation failed", error: err.message });
    }
  });

export default createPost;

// @desc    Edit an existing post
// @route   PUT /api/posts/:id
// @access  Private
const editPost = asyncHandler(async (req, res) => {
  const {
    eventSelection,
    productDetails,
    problemDiscussion,
    rcaFor6Ms,
    correctiveAction,
    preventiveAction,
  } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.eventSelection = eventSelection || post.eventSelection;
    post.productDetails = productDetails || post.productDetails;
    post.problemDiscussion = problemDiscussion || post.problemDiscussion;
    post.rcaFor6Ms = rcaFor6Ms || post.rcaFor6Ms;
    post.correctiveAction = correctiveAction || post.correctiveAction;
    post.preventiveAction = preventiveAction || post.preventiveAction;
    post.updatedAt = Date.now();
    post.updatedBy = req.user._id;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (post) {
    res.json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Private
const fetchAllPost = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("user", "name email");
  res.json(posts);
});

// @desc    Fetch a single post by ID
// @route   GET /api/posts/:id
// @access  Private
const fetchPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "user",
    "name email employeeCode department"
  );

  if (post) {
    res.json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Fetch posts created by the authenticated user
// @route   GET /api/posts/mine
// @access  Private
const fetchMyPosts = asyncHandler(async (req, res) => {
  console.log("User ID:", req.user._id);

  try {
    const posts = await Post.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc    Fetch all approved posts
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

// @desc    Fetch all unapproved posts
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

export {
  createPost,
  editPost,
  deletePost,
  fetchAllPost,
  fetchPostById,
  fetchMyPosts,
  fetchApprovedPosts,
  fetchUnapprovedPosts,
};
