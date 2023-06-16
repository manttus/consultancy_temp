import express from "express";
import { addFaq, getFaq } from "../controllers/faqController/faqController.js";

const router = express.Router();

router.get("/getFaq", getFaq);
router.post("/addFaq", addFaq);

export default router;
