import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import postReducer from './slices/postSlice';
import formSlice from './slices/formSlice';
import notificationsReducer from './slices/notificationSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    form: formSlice,
    notifications: notificationsReducer,
  },
});

export default store;
