import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  username: String,
  password: String,
  phone: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
