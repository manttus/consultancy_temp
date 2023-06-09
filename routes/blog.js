import express from "express";
import {
  getRecentBlogs,
  getBlog,
} from "../controllers/blogController/blogController.js";

const router = express.Router();

router.get("/recentBlog", getRecentBlogs);
router.get("/blog/:page/:limit", getBlog);

export default router;
