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
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ul.ie%2F&psig=AOvVaw03SpLVrZbnnlDGpCrIOeKn&ust=1686989976494000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCPjTkcqtx_8CFQAAAAAdAAAAABAP",
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
