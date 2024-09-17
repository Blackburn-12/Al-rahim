import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationAsRead } from "../redux/slices/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  console.log("Notifications state:", notifications); // Debugging line

  if (loading) {
    return <div>Loading notifications...</div>;
  }

  if (error) {
    return <div>Error loading notifications: {error}</div>;
  }

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <ul>
        {notifications.length === 0 ? (
          <li>No notifications</li>
        ) : (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className={notification.isRead ? "read" : "unread"}
              onClick={() => handleMarkAsRead(notification._id)} // Mark as read on click
            >
              <p>{notification.message}</p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
              <a href={`/posts/${notification.post}`}>View Post</a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
