import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
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
    commentText: {
      type: String,
      required: true,
    },
    userPicturePath: {
      type: String,
      required: true,
    },
    // TODO
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
  },
  { timestamps: true }
);

export default commentSchema;
