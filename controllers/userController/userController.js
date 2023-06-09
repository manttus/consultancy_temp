import User from "../../model/user.js";

export const isCompleted = async (req, res) => {
  const { email } = req.user;
  if (!email) return res.status(400).send({ message: "Invalid User" });
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid User" });
    }
    const emptyFieldsCount = Object.values(user._doc).filter(
      (value) => value === ""
    ).length;
    const totalFieldsCount = Object.keys(user._doc).length;
    const completedPercentage =
      ((totalFieldsCount - emptyFieldsCount) / totalFieldsCount) * 100;
    return res
      .status(200)
      .send({ message: "Sucess", percentage: completedPercentage.toFixed(2) });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const profile = async (req, res) => {
  try {
    const { email } = req.user;
    if (!email) return res.status(400).send({ message: "Invalid User" });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid User" });
    }
    const tempUser = user._doc;
    delete tempUser.password;
    return res.status(200).send({ tempUser });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const update = async (req, res) => {
  const { email } = req.user;
  if (!email) return res.status(400).send({ message: "Invalid User" });
  const { firstname, lastname, username, address, phone } = req.body;
  if (!firstname || !lastname || !username || !address || !phone) {
    return res.status(400).send({ message: "Invalid User" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "User does not exist" });
    user.firstname = firstname;
    user.lastname = lastname;
    user.address = address;
    user.phone = phone;
    user.username = username;
    await user.save();
    return res.status(200).send({ message: "User Updated" });
  } catch (err) {
    return res.status(500).send({ message: "Server Error" });
  }
};
