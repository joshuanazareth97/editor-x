import { Router } from "express";
import {
  createDocumentMeta,
  deleteDocument,
  getDocumentMeta,
  getDocuments,
  setDocumentMeta,
} from "../controllers/document.js";

const router = Router();

// Create route
router.post("/", createDocumentMeta);

// Read route
router.get("/", getDocuments);

// Read single document route
router.get("/:id", getDocumentMeta);

// Update route
router.put("/:id", setDocumentMeta);

// Delete route
router.delete("/:id", deleteDocument);

export default router;
