import Blog from "../../model/blog.js";

export const getRecentBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).send({ blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const getBlog = async (res, req) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex);
    return res.status(200).send({ blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to fetch blogs" });
  }
};
