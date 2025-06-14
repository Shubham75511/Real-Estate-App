import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js"; // import error handler
import jwt from "jsonwebtoken";
// import User model to interact with the database

export const signup = async (req, res, next) => {
  // 'req.body' is the information we get from browser.

  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  //then we are gonna save it inside the database using:
  const newUser = new User({ username, email, password: hashedPassword }); //from user.model.js
  try {
    await newUser.save(); //this is going to save it inside the db.
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error); // next(errorHandler(550, 'error from the function')); - we created the error in utils/error.js
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); // find user by email
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcrypt.compareSync(password, validUser.password); // compare password
    if (!validPassword) return next(errorHandler(401, "Wrong Credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc; // destructure to remove password from user details
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest); // set cookie with JWT token
    // create JWT token
  } catch (error) {
    next(error);
  }
};
