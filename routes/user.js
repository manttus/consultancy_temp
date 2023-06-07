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
    const percentage = await User.aggregate([
      {
        $project: {
          _id: 0,
          emptyStringFields: {
            $size: {
              $filter: {
                input: { $objectToArray: "$$ROOT" },
                as: "field",
                cond: { $eq: ["$$field.v", ""] },
              },
            },
          },
        },
      },
    ]);
    return res
      .status(200)
      .send({ percentage: percentage[0].completionPercentage });
  } catch (err) {
    return res.status(500).send({ message: "Failed to fetch user" });
  }
});

export default router;
