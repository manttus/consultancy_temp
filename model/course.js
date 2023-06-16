import mongoose from "mongoose";

const courseSchemaa = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  course: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchemaa);
export default Course;
