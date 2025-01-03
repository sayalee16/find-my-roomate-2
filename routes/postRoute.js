import express from "express";
import { addPost, deletePost, getPost } from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/:id",verifyToken, addPost);
router.get("/:id",verifyToken, getPost);
router.delete("/:id",verifyToken, deletePost);

export default router;