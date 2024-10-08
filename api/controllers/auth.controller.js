import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  // 'req.body' is the information we get from browser.

  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  //then we are gonna save it inside the database using:
  const newUser = new User({ username, email, password: hashedPassword }); //from user.model.js
  try {
    await newUser.save(); //this is going to save it inside the db.
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);    // next(errorHandler(550, 'error from the function')); - we created the error in utils/error.js
  }
};
