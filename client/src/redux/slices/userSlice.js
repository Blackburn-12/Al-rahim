import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to register user
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/register`,
      userData
    );
    return response.data;
  }
);

// Async thunk to login user
export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/users/login`,
      loginData
    );
    return response.data;
  }
);

// Async thunk to refetch user data
export const refetchUser = createAsyncThunk(
  "user/refetch",
  async (_, { getState }) => {
    const state = getState();
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

// Async thunk to logout user
export const logoutUser = createAsyncThunk("user/logout", async (_, { getState }) => {
  const state = getState();
  const token = localStorage.getItem("token");

  if (token) {
    try {
      // Optionally validate the token on the server side
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Logout request failed:", error.message);
    } finally {
      // Clear the token from local storage
      localStorage.removeItem("token");
    }
  }

  return;
});


// Async thunk to reset user password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (passwordData) => {
    // Make the request to the appropriate endpoint without needing authentication token
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/users/reset-password`,
      passwordData
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
      // Refetch user data
      .addCase(refetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(refetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null; // Clear user info on logout
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally handle successful password update
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
