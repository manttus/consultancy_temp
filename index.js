import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import OtpRouter from "./routes/otp.js";
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import BlogRouter from "./routes/blog.js";
import faqRouter from "./routes/faq.js";
import locationRouter from "./routes/location.js";
import courseRouter from "./routes/course.js";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import cronJobs from "./controllers/cron/cronJobs.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const port = process.env.PORT;
const mongo_uri = process.env.MONGO_URI;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  const { notification } = cronJobs(socket);
  notification();
  console.log("connected")
})

const swaggerDocument = YAML.load("./documentation.yaml");

app.use(express.json());
app.use(cors());
app.use("/api/otp", OtpRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/blog", BlogRouter);
app.use("/api/faq", faqRouter);
app.use("/api/course", courseRouter);
app.use("/api/location", locationRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



mongoose.connect(mongo_uri).then(() => {
  console.log({ message: "Connected to MongoDB" });
});

app.use("/api", (req, res) => {
  res.send({ message: "Wrong Endpoint" });
});

app.listen(port, () => {
  console.log({ message: "Server Started" });
});

server.listen(3002, () => {
  console.log(`Listening to port ${3002}`);
});
