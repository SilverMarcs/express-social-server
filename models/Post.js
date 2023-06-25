import mongoose from "mongoose";
import commentSchema from "./Comment.js";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      // this is a map of userIds to booleans. if the userId is in the map, then the user has liked the post. if not, then the user has not liked the post.
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
