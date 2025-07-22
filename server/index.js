// importing modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

// importing files
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";

// using modules
const app = express();
app.use(
  cors({
    credentials: true,
    orign: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

// Define port number
const PORT = process.env.PORT;

//Index route
app.get("/", (req, res) => {
  res.send("Welcome to BinkeyIt");
});

app.use("/api/user", userRouter);

// Start the server and connect nomgodb
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
