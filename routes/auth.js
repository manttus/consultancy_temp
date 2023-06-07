import express from "express";
import User from "../model/user.js";
import { generateToken } from "../helper/generateToken.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/token", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.status(403).send({ message: "Token Expired" });
        }
      }
    );
    const accessToken = generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      user.email,
      "1h"
    );
    return res.status(200).send({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Invalid token" });
  }
});

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;
  if (!firstname || !lastname || !email || !password || !username) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      username,
    });
    await newUser.save();
    const accessToken = generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      email,
      "1h"
    );
    const refreshToken = generateToken(
      process.env.REFRESH_TOKEN_SECRET,
      email,
      "7d"
    );

    return res.status(200).send({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).send({ message: "Failed to register" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send({ message: "Invalid data" });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const accessToken = generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      email,
      "1h"
    );
    const refreshToken = generateToken(
      process.env.REFRESH_TOKEN_SECRET,
      email,
      "7d"
    );
    return res
      .status(200)
      .send({ message: "Login Successful", accessToken, refreshToken });
  } catch (err) {
    return res.status(500).send({ message: "Failed to login" });
  }
});

export default router;
