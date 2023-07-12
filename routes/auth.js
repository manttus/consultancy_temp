import express from "express";

import {
  regenerate,
  register,
  login,
  oauth
} from "../controllers/authController/authController.js";

const router = express.Router();

router.post("/token", regenerate);
router.post("/register", register);
router.post("/login", login);
router.post("/oauth", oauth);

export default router;
