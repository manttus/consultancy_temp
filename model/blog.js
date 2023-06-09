import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 160,
    minlength: 3,
  },
  short_description: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 200,
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
  read_time: {
    type: Number,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogSchema);
