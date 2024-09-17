import express from "express";
import {
  registerUser,
  loginUser,
  userRefetch,
  logoutUser,
  resetPassword
} from "../controllers/userController.js";
import { protect } from "../middleware/userProtect.js";

const router = express.Router();

router.post("/register", registerUser); //working in postman
router.post("/login", loginUser); //working in postman
router.get("/profile", protect, userRefetch); //working in postman
router.post("/logout", protect, logoutUser); 
router.put('/reset-password', resetPassword);
export default router;
