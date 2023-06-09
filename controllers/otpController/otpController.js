import OTP from "../../model/otp.js";
import { sendMail } from "../../utils/sendMail.js";
import User from "../../model/user.js";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).send({ message: "Invalid Email" });
    }
    const otp = await OTP.findOne({ email, status: "pending" });
    const isExpired = otp ? new Date() > otp.expiredAt : false;
    if (isExpired) {
      otp.status = "expired";
      await otp.save();
    }
    if (otp && !isExpired) {
      return res.status(429).send({ message: "OTP already exists" });
    } else {
      const generatedOTP = Math.floor(100000 + Math.random() * 900000);
      const response = await sendMail(email, generatedOTP);
      if (response.message === "SUCCESS") {
        const otp = new OTP({
          email,
          otp: generatedOTP,
          expiredAt: new Date(new Date().getTime() + 2 * 60 * 1000),
        });
        await otp.save();
        return res.status(200).send({ message: "OTP sent successfully" });
      }
      return res.status(400).send({ message: "Failed to send OTP" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send({ message: "Invalid OTP" });
  }
  try {
    const isOtp = await OTP.findOne({ email, otp, status: "pending" });
    if (!isOtp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    const now = new Date();
    if (now > otp.expiredAt) {
      isOtp.status = "expired";
      await isOtp.save();
      return res.status(400).send({ message: "Invalid OTP" });
    }
    if (isOtp.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    isOtp.status = "verified";
    await isOtp.save();
    return res.status(200).send({ message: "OTP verified successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server Error" });
  }
};
