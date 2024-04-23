import { Router } from "express";
import {
  createDocument,
  getDocuments,
  getDocument,
  updateDocument,
  deleteDocument,
} from "../controllers/document.js";

const router = Router();

// Create route
router.post("/", createDocument);

// Read route
router.get("/", getDocuments);

// Read single document route
router.get("/:id", getDocument);

// Update route
router.put("/:id", updateDocument);

// Delete route
router.delete("/:id", deleteDocument);

export default router;
