import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register user
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; // Destructuring the request body

    const salt = await bcrypt.genSalt(); // Generating a salt for hashing the password
    const hashedPassword = await bcrypt.hash(password, salt); // Hashing the password with the salt

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    }); // Creating a new user with the request body

    const savedUser = await newUser.save(); // Saving the new user to the database
    res.status(201).json(savedUser); // Sending the saved user in the response if no errors occur
  } catch (err) {
    res.status(500).json({ error: err.message }); // Sending an error message in the response if an error occurs
  }
};
