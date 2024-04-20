import { Router } from "express";
const router = Router();
import { register, login, logout, checkStatus } from "./controllers/auth";

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", logout);

// Check authentication status
router.get("/status", checkStatus);

export default router;
