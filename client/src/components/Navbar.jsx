import logo from "../assets/capurn.png";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../redux/slices/notificationSlice";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, user]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <>
      <div className="relative">
        <div className="fixed top-0 right-0 flex items-center h-16 bg-white shadow-md w-full z-50">
          <img src={logo} alt="Logo" className="h-44 ml-4" />
          <button
            className="text-xl text-gray-600 ml-auto mr-4"
            onClick={toggleMenu}
          >
            ☰
          </button>
          {user && (
            <div className="relative mr-4">
              <FaBell
                className="text-2xl text-gray-600 cursor-pointer"
                onClick={toggleNotifications}
              />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
                  <div className="p-4">
                    <h3 className="text-gray-600 mb-2">Notifications</h3>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif._id}
                          className={`bg-blue-100 text-blue-900 p-2 rounded mb-2 ${
                            notif.isRead ? "opacity-50" : ""
                          }`}
                        >
                          {notif.message}
                          <Link to={`/posts/${notif.post}`}>
                            <button
                              onClick={() => handleMarkAsRead(notif._id)}
                              className="text-sm text-blue-500 ml-2"
                            >
                              View Post
                            </button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No new notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform z-50`}
        >
          {/* Sidebar Menu */}
          <div
            className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform z-50`}
          >
            <div className="p-4">
              <button
                className="text-xl text-gray-600 float-right"
                onClick={toggleMenu}
              >
                &times;
              </button>
              <div className="mt-12">
                {user ? (
                  <>
                    <Link
                      to="/"
                      className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                      onClick={toggleMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </Link>

                    <Link
                      to="/createmodule"
                      className={`block py-2 font-Poppins ${
                        user.isAllowed
                          ? "text-gray-600 hover:text-gray-500"
                          : "text-gray-300 cursor-not-allowed"
                      }`}
                      onClick={
                        user.isAllowed ? toggleMenu : (e) => e.preventDefault()
                      }
                    >
                      Create Module
                    </Link>

                    <Link
                      to="/myposts"
                      className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                      onClick={toggleMenu}
                    >
                      My posts
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="block text-white py-2 bg-[#005b70] hover:bg-[#00495a] px-4 rounded"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/"
                      className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                      onClick={toggleMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to="/login"
                      className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/edituserinfo"
                      className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                      onClick={toggleMenu}
                    >
                      Edit Info
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}
      </div>
    </>
  );
};

export default Navbar;
