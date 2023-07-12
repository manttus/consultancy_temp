import jwt from "jsonwebtoken";
import User from "../../model/user.js";
import { generateToken } from "../../helper/generateToken.js";
import axios from "axios";
import fetch from "node-fetch";

export const regenerate = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).send({ message: "Invalid token" });
  }
  try {
    const user = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.status(403).send({ message: "Token Expired" });
        }
        const accessToken = generateToken(
          process.env.ACCESS_TOKEN_SECRET,
          user.email,
          "1m"
        );
        return res.status(200).send({ accessToken });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Invalid token" });
  }
};

export const register = async (req, res) => {
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
      "1m"
    );
    const refreshToken = generateToken(
      process.env.REFRESH_TOKEN_SECRET,
      email,
      "5m"
    );

    return res.status(200).send({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).send({ message: "Failed to register" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return res.status(400).send({ message: "Invalid User" });
  }
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send({ message: "Invalid User" });
    }
    const accessToken = generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      email,
      "1m"
    );
    const refreshToken = generateToken(
      process.env.REFRESH_TOKEN_SECRET,
      email,
      "5m"
    );
    return res
      .status(200)
      .send({ message: "Login Successful", accessToken, refreshToken });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

export const oauth = async (req, res) => {
  const { token } = req.body;
  console.log(token)
  if (!token) {
    return res.status(400).send({ message: "Bad Request" })
  }
  const response = await fetch("https://oauth2.googleapis.com/tokeninfo", {
    method: "POST",
    body: JSON.stringify({ id_token: token })
  })
  //   id_token: token
  const data = await response.json()
  if (data.error) {
    return res.status(400).send({ message: data.error })
  }
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(400).send({ message: "Invalid User" });
    }
    const accessToken = generateToken(
      process.env.ACCESS_TOKEN_SECRET,
      data.email,
      "1m"
    );
    const refreshToken = generateToken(
      process.env.REFRESH_TOKEN_SECRET,
      data.email,
      "5m"
    );
    return res
      .status(200)
      .send({ message: "Login Successful", accessToken, refreshToken });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }


}
