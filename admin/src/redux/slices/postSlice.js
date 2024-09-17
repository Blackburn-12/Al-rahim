import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admins/posts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Fetched posts:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
});

// Async thunk to fetch a post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admins/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched post by ID:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  }
);

// Async thunk to update the isApproved field of a post
export const updatePostApproval = createAsyncThunk(
  "posts/updatePostApproval",
  async ({ id, isApproved }, { getState }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/admins/posts/${id}/approval`,
        { isApproved },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Updated post approval status:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating post approval status:", error);
      throw error;
    }
  }
);

// Async thunk to update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post, { getState }) => {
    const token = localStorage.getItem("token");
    console.log("Post object received:", post); // Log to confirm _id is present
    try {
      if (!post._id) {
        throw new Error("Post ID is missing.");
      }
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/admins/posts/${post._id}`,
        post,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Updated post:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
);

// Async thunk to delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { getState }) => {
    const { user } = getState();
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/admins/posts/${id}`,
        config
      );
      console.log("Deleted post with ID:", id);
      return id;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
);

// Async thunk to fetch approved posts
export const fetchApprovedPosts = createAsyncThunk(
  "posts/fetchApprovedPosts",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/admins/posts/approved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched approved posts:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching approved posts:", error);
      throw error;
    }
  }
);

// Async thunk to fetch unapproved posts
export const fetchUnapprovedPosts = createAsyncThunk(
  "posts/fetchUnapprovedPosts",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/posts/unapproved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched unapproved posts:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching unapproved posts:", error);
      throw error;
    }
  }
);

// Async thunk to approve a post
export const approvePost = createAsyncThunk(
  "posts/approvePost",
  async (postId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/admins/posts/${postId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Post slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    approvedPosts: [],   // Added this
    unapprovedPosts: [], // Added this
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            ...action.payload,
          };
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePostApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostApproval.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            isApproved: action.payload.isApproved,
          };
        }
      })
      .addCase(updatePostApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // For approved posts
      .addCase(fetchApprovedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApprovedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.approvedPosts = action.payload;
      })
      .addCase(fetchApprovedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // For unapproved posts
      .addCase(fetchUnapprovedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnapprovedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.unapprovedPosts = action.payload;
      })
      .addCase(fetchUnapprovedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(approvePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex(post => post._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
