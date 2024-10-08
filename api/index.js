import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

//Now connecting server to database using mongodb/mangoose
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("err");
  });

const app = express(); // create app

app.use(express.json());

//listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

//install nodemon - to save changes instantly

//create api route

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter); // api test softwares ex like postman, insomnia etc.

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: "false",
    statusCode,
    message,
  });
});
