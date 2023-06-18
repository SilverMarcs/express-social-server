import bodyParser from "body-parser"; // Importing the 'body-parser' module to parse the request body
import cors from "cors"; // Importing the 'cors' module to enable Cross-Origin Resource Sharing
import dotenv from "dotenv"; // Importing the 'dotenv' module to load environment variables from a .env file
import express from "express"; // Importing the 'express' module to create an Express application
import helmet from "helmet"; // Importing the 'helmet' module to set various HTTP headers for security
import mongoose from "mongoose"; // Importing the 'mongoose' module to connect to MongoDB
import morgan from "morgan"; // Importing the 'morgan' module for HTTP request logging
import multer from "multer"; // Importing the 'multer' module for handling file uploads
import path from "path"; // Importing the 'path' module for working with file and directory paths
import { fileURLToPath } from "url"; // Importing the 'fileURLToPath' function from the 'url' module to convert a file URL to a file path
import { register } from "./controllers/auth.js"; // Importing the 'register' function from the './controllers/auth.js' file
import authRoutes from "./routes/auth.js"; // Importing the 'authRoutes' from the './routes/auth.js' file

/* configuration */
const __filename = fileURLToPath(import.meta.url); // Getting the file path of the current module
const __dirname = path.dirname(__filename); // Getting the directory path of the current module
dotenv.config(); // Loading environment variables from a .env file
app = express(); // Creating an Express application
app.use(express.json()); // Parsing JSON request bodies
app.use(helmet()); // Setting various HTTP headers for security using Helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Configuring Cross-Origin Resource Policy for Helmet
app.use(morgan("common")); // Logging HTTP requests using Morgan
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parsing JSON request bodies with a limit of 30mb and extended mode
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Parsing URL-encoded request bodies with a limit of 30mb and extended mode
app.use(cors); // Enabling Cross-Origin Resource Sharing
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Serving static files from the 'public/assets' directory under the '/assets' route

/* file storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); // Setting the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Setting the filename for uploaded files
  },
});

const upload = multer({ storage }); // Creating a multer instance with the specified storage configuration

/* routes with files */
app.post("/auth/register", upload.single("picture"), register);

/* routes */
app.use("/auth", authRoutes); // Using the 'authRoutes' for requests to the '/auth' route

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
  })
  .catch((err) => {
    console.log(`${err} did not connect`); // Logging an error message if the connection to MongoDB fails
  });
