import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
