import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import OtpRouter from "./routes/otp.js";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import BlogRouter from "./routes/blog.js";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
const app = express();

const swaggerDocument = YAML.load("./documentation.yaml");

app.use(express.json());
app.use(cors());
app.use("/api/otp", OtpRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/blog", BlogRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(mongo_uri).then(() => {
  console.log({ message: "Connected to MongoDB" });
});

app.use("/api", (req, res) => {
  res.send({ message: "API is running" });
});

app.listen(port, () => {
  console.log({ message: "Server Started" });
});
