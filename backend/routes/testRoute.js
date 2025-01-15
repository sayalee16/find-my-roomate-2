import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/testController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/logged-in", verifyToken, shouldBeLoggedIn);

router.get("/admin", shouldBeAdmin);


export default router;