import express from "express"
import {house} from "../controllers/houseController.js";

const router = express.Router();

router.get("/data" , house);

export default router;