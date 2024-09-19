//create user model
import mongoose from "mongoose";

//create rules

const userSchema = new mongoose.schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;       //Use it anywhere in application(by import)