import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/admins/register`,
      userData
    );
    return response.data;
  }
);

// Async thunk to login user
export const loginUser = createAsyncThunk("user/login", async (loginData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/admins/login`,
    loginData
  );
  return response.data;
});

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/admins/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

// Async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/admins/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to edit user information
export const editUserInfo = createAsyncThunk(
  "admin/editUserInfo",
  async (userData, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/admins/users/${userData._id}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    userInfo: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        localStorage.setItem("token", action.payload.token); // Save token to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Edit user information
      .addCase(editUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        // Update the user information in the state
        const updatedUsers = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
        state.users = updatedUsers;
      })
      .addCase(editUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
