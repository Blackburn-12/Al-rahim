import express from "express";
import { fetchNotifications, fetchUserNotifications, markNotificationAsRead, markUserNotificationAsRead } from "../controllers/notificationsController.js";
import { adminProtect } from "../middleware/adminProtect.js";
import { protect } from "../middleware/userProtect.js"
const router = express.Router();

router.get("/", adminProtect, fetchNotifications);
router.patch('/:id', adminProtect, markNotificationAsRead);

router.get("/usernotifications", protect, fetchUserNotifications);
router.patch('/usernotifications/:id', protect, markUserNotificationAsRead);
export default router;
