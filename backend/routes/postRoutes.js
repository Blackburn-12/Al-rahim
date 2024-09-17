import express from "express";
import {
  createPost,
  editPost,
  deletePost,
  fetchAllPost,
  fetchPostById,
  fetchMyPosts,
  fetchApprovedPosts,
  fetchUnapprovedPosts, // Import fetchMyPosts
} from "../controllers/postController.js";
import { protect } from "../middleware/userProtect.js";

const router = express.Router();

export default (io) => {
  router.post("/", protect, createPost(io)); // Pass `io` to createPost
  // New routes for approved and unapproved posts
  router.route("/approved").get(fetchApprovedPosts);
  router.route("/unapproved").get(fetchUnapprovedPosts);
  router.get("/mine", protect, fetchMyPosts); // Add route for myPosts
  router.get("/:id", fetchPostById);
  router.put("/:id", protect, editPost);
  router.delete("/:id", protect, deletePost);
  router.get("/", fetchAllPost);

  return router;
};
