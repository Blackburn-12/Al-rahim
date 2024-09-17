import express from "express";
import {
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
  fetchApprovedPosts,       // Added this line
  fetchUnapprovedPosts,
  approvePost,     // Added this line
} from "../controllers/adminController.js";
import { adminProtect } from "../middleware/adminProtect.js";

const router = express.Router();

// for users
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", adminProtect, adminRefetch);
router.get("/users", adminProtect, getAllUsers);
router.put("/users/:id", adminProtect, editUserInfo);

// for approving the posts
router.patch('/posts/:id/approve',adminProtect, approvePost);

// for posts
router.get("/posts", fetchAllPostsAdmin);
router.get("/posts/:id", adminProtect, fetchPostByIdAdmin);
router.put("/posts/:id", adminProtect, editPostAdmin);
router.delete("/posts/:id", adminProtect, deletePostAdmin);

// for approved and unapproved posts
router.get("/posts/approved", adminProtect, fetchApprovedPosts);    // Added this line
router.get("/posts/unapproved", adminProtect, fetchUnapprovedPosts); // Added this line

// for number of total posts
router.get('/count', getTotalPostsCount);


export default router;
