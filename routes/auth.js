import express from "express";

import {
  regenerate,
  register,
  login,
} from "../controllers/authController/authController.js";

const router = express.Router();

router.post("/token", regenerate);
router.post("/register", register);
router.post("/login", login);

export default router;
