import { Router } from "express";
import {
  createDocumentMeta,
  deleteDocument,
  getDocumentMeta,
  getDocuments,
  setDocumentMeta,
} from "../controllers/document.js";

const raiseForbidden = (req, res, next) => {
  const { username, userId } = req.session;
  if (username && userId) return next();
  res.status(403).send("Forbidden");
};

const router = Router();

router.use(raiseForbidden);
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
