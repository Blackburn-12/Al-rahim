import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch the total number of posts
export const fetchTotalPostsCount = createAsyncThunk(
  "posts/fetchTotalPostsCount",
  async () => {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admins/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.totalPosts;
  }
);

const postsSlice = createSlice({
  name: "postsCounter",
  initialState: {
    posts: [],
    totalPosts: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalPostsCount.pending, (state) => {
        state.loading = true;
        console.log("Fetching total posts count...");
      })
      .addCase(fetchTotalPostsCount.fulfilled, (state, action) => {
        state.loading = false;
        state.totalPosts = action.payload;
        console.log("Total posts count fetched:", action.payload);
      })
      .addCase(fetchTotalPostsCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error("Error fetching total posts count:", action.error.message);
      });
  },
});


export default postsSlice.reducer;
