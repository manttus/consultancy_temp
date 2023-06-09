import express from "express";
import { authorization } from "../middleware/authorization.js";
import {
  isCompleted,
  profile,
  update,
} from "../controllers/userController/userController.js";
const router = express.Router();

router.get("/isCompleted", authorization, isCompleted);
router.get("/profile", authorization, profile);
router.put("/profile", authorization, update);

export default router;
