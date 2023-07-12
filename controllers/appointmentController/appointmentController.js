import Appointment from "../../model/appointment";

const quotas = {
  Sun: 10,
  Mon: 20,
  Tue: 10,
  Wed: 10,
  Thur: 10,
  Fri: 10,
};

export const sendAppointment = async (req, res) => {
  const { location, username, email, date } = req.body;
  if (!location || !username || !email || !date) {
    return res.status(400).send({ message: "Bad Request" });
  }
  const weekDay = data.split(",")[0];
  const recent = await Appointment.findOne({}, { sort: { $natural: -1 } });
  const check = await Appointment.aggregate([
    {
      $group: {
        _id: "$date",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $match: {
        count: quotas[weekDay],
      },
    },
  ]);
  if (check) return res.status(400).send({ message: "Quota Limit" });
  new Appointment({
    email,
    location,
    username,
  }).save();
};

export const getUpcommingAppointment = () => {};
export const getCompletedAppointment = () => {};
export const getPendingAppointment = () => {};
export const getLocation = () => {};
export const getType = () => {};

export default appointmentController;
