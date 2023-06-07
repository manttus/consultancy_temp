import express from "express";
import User from "../model/user.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

router.get("/isCompleted", authorization, async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const emptyFieldsCount = Object.values(user._doc).filter(
      (value) => value === ""
    ).length;
    const totalFieldsCount = Object.keys(user._doc).length;
    const completedPercentage =
      ((totalFieldsCount - emptyFieldsCount) / totalFieldsCount) * 100;
    return res.status(200).send({ percentage: completedPercentage.toFixed(2) });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to fetch user" });
  }
});

export default router;
