import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => {
        console.log('Connected to MongoDB!');
    }
).catch(
    (err) => {
        console.log('err');
    }
);

const app = express(); // create app

//listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
}
);

//install nodemon - to save changes instantly

//Now connecting server to database using mongodb/mangoose