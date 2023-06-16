import express from "express";
import {
  getFilterData,
  addLocation,
  addDegree,
  getCountries,
} from "../controllers/locationController/locationController.js";

const router = express.Router();
router.get("/getFilters", getFilterData);
router.post("/addLocation", addLocation);
router.post("/addDegree", addDegree);
router.get("/getCountries", getCountries);

export default router;
