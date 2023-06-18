import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* register user */
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

/* login user */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructuring the request body
    const user = await User.findOne({ email: email }); // Finding a user with the specified email
    if (!user) return res.status(400).json({ msg: "User not found" }); // Returning an error message if no user is found with the specified email

    const isMatch = await bcrypt.compare(password, user.password); // Comparing the password with the hashed password stored in the database
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" }); // Returning an error message if the password is incorrect

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Creating a JWT with the user ID and the JWT secret. jwt is a package that helps us create and verify JSON Web Tokens. we need to sign the JWT with a secret key so that we can verify it later. we can use the user ID as the payload of the JWT since it is unique to each user. we can access the JWT secret from the .env file using process.env.JWT_SECRET
    delete user.password; // Deleting the password from the user object so that it is not sent in the response
    res.status(200).json({ token, user }); // Sending the user and the JWT in the response if no errors occur
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
