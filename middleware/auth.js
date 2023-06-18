import jwt from "jsonwebtoken";

// This middleware function will be used to verify the JWT sent in the request. next is a function that will be called if the JWT is valid. If the JWT is invalid, an error will be sent in the response.
const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization"); // Getting the JWT from the request header
    if (!token) {
      return res.status(403).send("Access denied");
    }
    if (token.startsWith("Bearer ")) {
      // this is set on the frontend
      token = token.slice(7, token.length).trimLeft(); // Removing the Bearer prefix from the token
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Setting the user property of the request object to the verified user
    next(); // example: app.post("/auth/register", upload.single("picture"), verifyToken, register). here, next is the 'register' function. note this in this register context, we dont verifyToken. this is just an example
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
