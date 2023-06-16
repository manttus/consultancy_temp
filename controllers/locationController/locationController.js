import Location from "../../model/location.js";
import Degree from "../../model/degree.js";
import Country from "../../model/country.js";
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

export const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    return res.status(200).send({ countries });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};

export const addCountry = async (req, res) => {
  const { country } = req.body;
  if (!country) return res.status(400).send({ message: "Bad Request" });
  try {
    new Country({
      country,
    }).save();
    return res.status(200).send({ message: "Country Added" });
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
