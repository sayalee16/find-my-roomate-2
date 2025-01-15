import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getUser);

router.get("/:id", verifyToken, getUser);

router.put("/:id",verifyToken ,updateUser);

router.delete("/:id", verifyToken,deleteUser)

export default router;