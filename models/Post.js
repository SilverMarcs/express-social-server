import mongoose from "mongoose";

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
      // currently comments are just strings with no other info. Later change this to be an array of objects that contain the comment and the userId of the user who made the comment.
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
