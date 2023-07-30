import bodyParser from "body-parser"; // Importing the 'body-parser' module to parse the request body
import { v2 as cloudinary } from "cloudinary";
import cors from "cors"; // Importing the 'cors' module to enable Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Importing the 'dotenv' module to load environment variables from a .env file
import express from "express"; // Importing the 'express' module to create an Express application
import helmet from "helmet"; // Importing the 'helmet' module to set various HTTP headers for security
import mongoose from "mongoose"; // Importing the 'mongoose' module to connect to MongoDB
import morgan from "morgan"; // Importing the 'morgan' module for HTTP request logging
import multer from "multer"; // Importing the 'multer' module for handling file uploads
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path"; // Importing the 'path' module for working with file and directory paths
import { fileURLToPath } from "url"; // Importing the 'fileURLToPath' function from the 'url' module to convert a file URL to a file path
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { posts, users } from "./data/data.js";
import { verifyToken } from "./middleware/auth.js";
import Post from "./models/Post.js";
import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

/* configuration */
const __filename = fileURLToPath(import.meta.url); // Getting the file path of the current module
const __dirname = path.dirname(__filename); // Getting the directory path of the current module
dotenv.config(); // Loading environment variables from a .env file
const app = express(); // Creating an Express application
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  })
);
app.use(express.json()); // Parsing JSON request bodies
app.use(helmet()); // Setting various HTTP headers for security using Helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configuring Cross-Origin Resource Policy for Helmet
app.use(morgan("common")); // Logging HTTP requests using Morgan
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parsing JSON request bodies with a limit of 30mb and extended mode
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parsing URL-encoded request bodies with a limit of 30mb and extended mode

app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serving static files from the 'public/assets' directory under the '/assets' route

// TODO move cloudinary stuff to separate file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* file storage */
const storageUser = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_images",
  },
});

const storagePost = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "post_images",
  },
});

const uploadUser = multer({ storage: storageUser });
const uploadPost = multer({ storage: storagePost });

/* routes with files */
app.post("/auth/register", uploadUser.single("picture"), register);
app.post("/posts", verifyToken, uploadPost.single("picture"), createPost);
// listens/is an endpoint to handle for a POST request to the '/posts' route and calls the createPost function. The verifyToken middleware is passed as the second argument to the post function to verify the JWT token in the request header.

/* routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes); // listens for all types of HTTP requests to the '/posts' route and calls the postRoutes function. This can be used to perform authentication or other types of processing before passing on the request to the appropriate endpoint.

/* mongoose */
const PORT = process.env.PORT || 6001; // Setting the port for the server to listen on
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Connecting to MongoDB with the provided URL and options
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // Starting the server and logging a message when the server is running
    });
    /* ADD ONE TIME ONLY */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((err) => {
    console.log(`${err} did not connect`); // Logging an error message if the connection to MongoDB fails
  });
