import express from "express";
import User from "../model/user.js";
import { authorization } from "../middleware/authorization.js";

const router = express.Router();

router.post("/isCompleted", authorization, async (req, res) => {
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
          completedFields: {
            $size: {
              $filter: {
                input: { $objectToArray: "$$ROOT" },
                as: "field",
                cond: {
                  $or: [
                    { $eq: ["$$field.v", ""] },
                    { $eq: ["$$field.v", null] },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalDocuments: { $sum: 1 },
          totalCompletedFields: { $sum: "$completedFields" },
        },
      },
      {
        $project: {
          _id: 0,
          completionPercentage: {
            $multiply: [
              { $divide: ["$totalCompletedFields", "$totalDocuments"] },
              100,
            ],
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
