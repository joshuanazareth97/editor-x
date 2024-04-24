import { Router } from "express";
const router = Router();
import { login, logout } from "../controllers/auth.js";

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", logout);

export default router;
