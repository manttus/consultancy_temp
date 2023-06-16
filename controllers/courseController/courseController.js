import Course from "../../model/course.js";

export const getCourse = async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).send({ data: course });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

export const addCourse = async (req, res) => {};
