import express from "express";
import {
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller.js";
import { authProtection } from "../middleware/Auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authProtection, getUserProfile);
router.get("/", getUsers);
router.get("/logout", authProtection, logoutUser);

export default router;
