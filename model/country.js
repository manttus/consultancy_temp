import mongoose from "mongoose";

const countriesSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
});

const Country = mongoose.model("Country", countriesSchema);
export default Country;
