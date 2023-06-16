import express from "express";

import {
  getCourse,
  addCourse,
} from "../controllers/courseController/courseController.js";

const router = express.Router();

router.get("/getCourse", getCourse);
router.post("/addCourse", addCourse);

export default router;
