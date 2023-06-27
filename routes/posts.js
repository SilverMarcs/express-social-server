import express from "express";
import {
  createComment,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* read */
router.get("/", getFeedPosts); // for now, getFeedPosts will return all posts. later, we will implement puling posts only from friends. TODO
router.get("/:userId/", getUserPosts); // querying posts only for a particular user. in my profile, I should only see my posts

/* update */
router.patch("/:id/like", likePost); //passing in the id of the post to like
router.patch("/:id/comments", createComment); //passing in the id of the post to comment on

export default router;
