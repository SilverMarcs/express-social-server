import Post from "../models/Post.js";
import User from "../models/User.js";

/* create */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body; // all the stuff the forntend sends to us.
    const user = await User.findById(userId); // we find the user who is making the post
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find(); // we find all the posts in the database and send it back to the frontend. TODO: change this to only send back the posts of the user's friends.

    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* read */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // we find all the posts in the database and send it back to the frontend. TODO: change this to only send back the posts of the user's friends.
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* update */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params; // id of the post to like/unlike
    const { userId } = req.body; // id of the user who is liking the post
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId); // if the user has liked the post, this will be true. else, it will be false.

    if (isLiked) {
      post.likes.delete(userId); // if the user has liked the post, we remove the like
    } else {
      post.likes.set(userId, true); // else, we add the like
    }

    const updatedPost = await Post.findByIdAndUpdate(
      // we update the post in the database with the new map of likes
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
