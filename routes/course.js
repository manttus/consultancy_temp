import express from "express";

import {
  getCourse,
  addCourse,
  searchCourses,
  filterCourse,
} from "../controllers/courseController/courseController.js";

const router = express.Router();

router.get("/getCourse", getCourse);
router.post("/addCourse", addCourse);
router.get("/searchCourses/:Search", searchCourses);
router.post("/filterCourses", filterCourse);

export default router;
