import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import postsCounterReducer from './slices/postCountSlice';
import notificationsReducer from './slices/notificationSlice'; // Import the notifications slice

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    postsCounter: postsCounterReducer,
    notifications: notificationsReducer, // Add the notifications slice
  },
});

export default store;
