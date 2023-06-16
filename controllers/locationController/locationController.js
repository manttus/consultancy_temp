import Location from "../../model/location.js";
export const getLocation = async (req, res) => {
  try {
    const course = await Location.find();
    return res.status(200).send({ locations: course });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

export const addLocation = async (req, res) => {
  const { location } = req.body;
  if (!location) return res.status(400).send({ message: "Bad Request" });
  try {
    new Location({
      location,
    }).save();
    return res.status(200).send({ message: "Location Added" });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};
