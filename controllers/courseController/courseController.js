import Course from "../../model/course.js";

export const getCourse = async (req, res) => {
  try {
    const course = await Course.find();
    return res.status(200).send({ data: course });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

export const searchCourses = async (req, res) => {
  const { Search } = req.params;
  try {
    const courses = await Course.find({
      course: { $regex: Search, $options: "i" },
    });
    return res.status(200).send({ data: courses });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const addCourse = async (req, res) => {
  const { location, college, course, degree } = req.body;
  if (!location || !college || !course || !degree) {
    return res.status(400).send({ message: "Bad Request" });
  }

  try {
    new Course({
      college,
      course,
      degree,
      location,
    }).save();
    return res.status(200).send({ message: "Course Added" });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};
