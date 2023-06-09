import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 160,
    minlength: 3,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    maxlength: 2000,
    minlength: 3,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogSchema);
