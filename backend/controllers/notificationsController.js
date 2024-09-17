import asyncHandler from 'express-async-handler';
import Notification from '../models/Notification.js';

// Fetch all notifications for the logged-in admin
export const fetchNotifications = asyncHandler(async (req, res) => {
    try {
        if (!req.admin || !req.admin._id) {
            res.status(401).json({ message: 'Not authorized, no admin' });
            return;
        }

        // Fetch notifications for the admin
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Controller to mark a notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the notification by ID
      const notification = await Notification.findById(id);
  
      if (!notification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
  
      // Update the notification's isRead status
      notification.isRead = true;
      await notification.save();
  
      // Respond with the updated notification
      res.status(200).json(notification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// // Fetch all notifications for the logged-in user
export const fetchUserNotifications = asyncHandler(async (req, res) => {
  try {
      // Check if user exists
      if (!req.user || !req.user._id) {
          return res.status(401).json({ message: 'Not authorized, no user' });
      }

      // Fetch notifications specific to the logged-in user
      const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
      res.status(200).json(notifications);
  } catch (error) {
      console.error('Error fetching notifications:', error.message);
      res.status(500).json({ message: 'Server error' });
  }
});

// Controller to mark a notification as read for a user
export const markUserNotificationAsRead = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the notification by ID and ensure it belongs to the logged-in user
    const notification = await Notification.findOne({ _id: id, user: req.user._id });

    if (!notification) {
      console.log('Notification not found or unauthorized', { id, user: req.user._id });
      return res.status(404).json({ message: 'Notification not found or unauthorized' });
    }

    // Update the notification's isRead status
    notification.isRead = true;
    await notification.save();

    // Respond with the updated notification
    res.status(200).json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});
