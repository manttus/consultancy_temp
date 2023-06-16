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
      "https://cdn.britannica.com/85/13085-050-C2E88389/Corpus-Christi-College-University-of-Cambridge-England.jpg",
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
