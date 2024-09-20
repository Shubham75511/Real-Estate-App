import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
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

//listen on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

//install nodemon - to save changes instantly


//create api route

app.use('/api/user', userRouter);
