import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/posts/`,
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
    return rejectWithValue(error.response.data || error.message);
  }
});

// Async thunk to fetch a post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${id}`,
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
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to update a post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log("Post object received:", post); // Log to confirm _id is present
    try {
      if (!post._id) {
        throw new Error("Post ID is missing.");
      }
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${post._id}`,
        post,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Updated post:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to delete a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${id}`,
        config
      );
      console.log("Deleted post with ID:", id);
      return id;
    } catch (error) {
      console.error("Error deleting post:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to fetch posts created by the logged-in user
export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/posts/mine`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched my posts:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching my posts:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to fetch approved posts
export const fetchApprovedPosts = createAsyncThunk(
  "posts/fetchApprovedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/posts/approved`,
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
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Async thunk to fetch unapproved posts
export const fetchUnapprovedPosts = createAsyncThunk(
  "posts/fetchUnapprovedPosts",
  async (_, { rejectWithValue }) => {
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
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const initialState = {
  posts: [], // List of posts
  post: null, // Single post details
  myPosts: [], // List of posts for the current user
  approvedPosts: [], // List of approved posts
  unapprovedPosts: [], // List of unapproved posts
  loading: false,
  error: null,
  myPostsLoading: false,
  myPostsError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  approvedPostsLoading: false,
  approvedPostsError: null,
  unapprovedPostsLoading: false,
  unapprovedPostsError: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    resetFormData(state) {
      state.formData = initialState.formData;
    },
    resetPostState(state) {
      state.posts = [];
      state.myPosts = [];
      state.post = null; // Reset single post state
      state.error = null;
      state.myPostsError = null;
      state.updateError = null;
      state.deleteError = null;
      state.approvedPosts = [];
      state.unapprovedPosts = [];
      state.approvedPostsError = null;
      state.unapprovedPostsError = null;
    },
  },
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
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // Set single post state
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            ...action.payload,
          };
        }
        if (state.post && state.post._id === action.payload._id) {
          state.post = {
            ...state.post,
            ...action.payload,
          };
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload || action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        if (state.post && state.post._id === action.payload) {
          state.post = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
      })
      .addCase(fetchMyPosts.pending, (state) => {
        state.myPostsLoading = true;
        state.myPostsError = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.myPostsLoading = false;
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.myPostsLoading = false;
        state.myPostsError = action.payload || action.error.message;
      })
      .addCase(fetchApprovedPosts.pending, (state) => {
        state.approvedPostsLoading = true;
        state.approvedPostsError = null;
      })
      .addCase(fetchApprovedPosts.fulfilled, (state, action) => {
        state.approvedPostsLoading = false;
        state.approvedPosts = action.payload;
      })
      .addCase(fetchApprovedPosts.rejected, (state, action) => {
        state.approvedPostsLoading = false;
        state.approvedPostsError = action.payload || action.error.message;
      })
      .addCase(fetchUnapprovedPosts.pending, (state) => {
        state.unapprovedPostsLoading = true;
        state.unapprovedPostsError = null;
      })
      .addCase(fetchUnapprovedPosts.fulfilled, (state, action) => {
        state.unapprovedPostsLoading = false;
        state.unapprovedPosts = action.payload;
      })
      .addCase(fetchUnapprovedPosts.rejected, (state, action) => {
        state.unapprovedPostsLoading = false;
        state.unapprovedPostsError = action.payload || action.error.message;
      });
  },
});

// Export the action creators and reducer
export const { updateFormData, resetFormData, resetPostState } = postSlice.actions;

export default postSlice.reducer;
