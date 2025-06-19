import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
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

  const __dirname = path.resolve(); // to get the current directory name

const app = express(); // create app

app.use(express.json());

app.use(cookieParser()); // to parse cookies

//listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

//install nodemon - to save changes instantly

//create api route

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter); // api test softwares ex like postman, insomnia etc.
app.use("/api/listing", listingRouter); // add listing route

app.use(express.static(path.join(__dirname, "/client/dist"))); // serve static files from client/dist

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // serve index.html for all other routes
})

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
