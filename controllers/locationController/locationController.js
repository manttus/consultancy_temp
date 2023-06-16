import Location from "../../model/location.js";
import Degree from "../../model/degree.js";
export const getFilterData = async (req, res) => {
  try {
    const locations = await Location.find();
    const degrees = await Degree.find();
    return res.status(200).send({ locations, degrees });
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

export const addDegree = async (req, res) => {
  const { degree } = req.body;
  if (!degree) return res.status(400).send({ message: "Bad Request" });
  try {
    new Degree({
      degree,
    }).save();
    return res.status(200).send({ message: "Degree Added" });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};
