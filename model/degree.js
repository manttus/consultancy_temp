import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
});

const Degree = mongoose.model("Degree", degreeSchema);
export default Degree;
