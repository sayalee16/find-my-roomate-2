import express from "express";
import { addPost, deletePost, getPost, getHouse } from "../controllers/postController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/:id",verifyToken, addPost);
router.get("/:id",verifyToken, getPost);
router.post("/:userId",verifyToken, deletePost);
router.get("/view-more/:id", getHouse);

export default router;