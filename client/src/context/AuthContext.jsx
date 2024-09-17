import React, { createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginUser as loginUserAction,
  logoutUser as logoutUserAction,
  refetchUser as refetchUserAction,
} from "../redux/slices/userSlice";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data if token exists
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(refetchUserAction());
    }
  }, [dispatch]);

  const login = (loginData) => {
    // Make sure to pass the login data to loginUserAction
    dispatch(loginUserAction(loginData)).then(({ payload }) => {
      localStorage.setItem("token", payload.token); // Save token to localStorage
      dispatch(refetchUserAction()); // Fetch user data
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUserAction()); // Clear user info in the state
    navigate("/login"); // Redirect to login or home page
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
