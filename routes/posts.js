import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* read */
router.get("/", verifyToken, getFeedPosts); // for now, getFeedPosts will return all posts. later, we will implement puling posts only from friends. TODO
router.get("/:userId/posts", verifyToken, getUserPosts); // querying posts only for a particular user. in my profile, I should only see my posts

/* update */
router.patch("/:id/like", verifyToken, likePost); //passing in the id of the post to like

export default router;
