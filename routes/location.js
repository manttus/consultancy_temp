import express from "express";
import {
  getLocation,
  addLocation,
} from "../controllers/locationController/locationController.js";

const router = express.Router();
router.get("/getLocation", getLocation);
router.post("/addLocation", addLocation);

export default router;
