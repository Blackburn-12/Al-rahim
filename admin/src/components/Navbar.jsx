import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../redux/slices/notificationSlice";
import logo from "../assets/capurn.png";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notifications);

  // Fetch notifications on component mount
  useEffect(() => {
    if (user) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, user]);

  // Handle marking notifications as read
  const handleNotificationClick = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
    // Optionally, close the notifications dropdown after clicking
    setIsNotificationsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <div>
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
              <RiCloseLine />
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
                    to="/approve-posts"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                    onClick={toggleMenu}
                  >
                    Approve posts
                  </Link>
                  <Link
                    to="/edituserinfo"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                    onClick={toggleMenu}
                  >
                    Edit User
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="block text-white py-2 bg-[#005b70] hover:bg-[#00495a] px-4 rounded mt-2 font-Poppins"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/"
                    className="block text-gray-600 hover:text-gray-500 py-2 font-Poppins"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </>
                
              )}
            </div>
          </div>
        </div>

        {/* Overlay to close sidebar when clicking outside */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
        )}

        {/* Logo and Toggle Button */}
        <div className="fixed top-0 right-0 flex items-center h-16 bg-white shadow-md w-full z-50 px-4">
          <img src={logo} alt="Logo" className="h-12" />
          <div className="ml-auto flex items-center">
            {user && (
              <>
                <button
                  className="relative text-xl text-gray-600 mx-4"
                  onClick={toggleNotifications}
                >
                  <FaBell size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button className="text-xl text-gray-600" onClick={toggleMenu}>
                  <AiOutlineMenu />
                </button>
              </>
            )}
            {!user && (
              <button
                className="text-xl text-gray-600 ml-4"
                onClick={toggleMenu}
              >
                <AiOutlineMenu />
              </button>
            )}
          </div>
        </div>

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="fixed top-16 right-0 w-80 bg-white shadow-lg z-50 border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 font-Poppins">
              <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-2">
                Notifications
              </h2>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="py-4 text-center text-gray-600">
                    No notifications
                  </li>
                ) : (
                  notifications.map((notification) => (
                    <li
                      key={notification._id}
                      className={`py-3 px-4 border-b border-gray-200 ${
                        notification.isRead ? "bg-gray-50" : "bg-gray-100"
                      }`}
                      onClick={() => handleNotificationClick(notification._id)}
                    >
                      <p className="text-sm font-medium">
                        {notification.message}
                      </p>
                      <small className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleString()}
                      </small>
                      <Link
                        to={`/posts/${notification.post}`}
                        className="block mt-2 text-primary-button hover:underline text-sm"
                      >
                        View Post
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
