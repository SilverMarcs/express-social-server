import express from "express";
import {
  addRemoveFriend,
  getUser,
  getUserFriends,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* read */
router.get("/:id", verifyToken, getUser); // this line means that when a GET request is sent to the '/users/:id' route, the getUser function will be called. basically when the frontend sends an id, we can query the database with this id
router.get("/:id/friends", verifyToken, getUserFriends);

/* update */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend); //passing in the id of the user and the id of the friend to add/remove

export default router;
