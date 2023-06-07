import expres from "express";
import User from "../model/user.js";
import { sendMail } from "../utils/sendMail.js";
import OTP from "../model/otp.js";

const router = expres.Router();

router.post("/sendOtp", async (req, res) => {
  try {
    const { email } = req.body;
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).send({ message: "Email already exists" });
    }
    const otp = await OTP.findOne({ email, status: "pending" });
    const isExpired = otp ? new Date() > otp.expiredAt : false;
    if (isExpired) {
      otp.status = "expired";
      await otp.save();
    }
    if (otp && !isExpired) {
      return res.status(400).send({ message: "OTP already sent" });
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
});

router.post("/verifyOtp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send({ message: "Invalid data" });
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
      return res.status(400).send({ message: "OTP expired" });
    }
    if (isOtp.otp !== otp) {
      return res.status(400).send({ message: "Invalid OTP" });
    }
    isOtp.status = "verified";
    await isOtp.save();
    return res.status(200).send({ message: "OTP verified successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to verify OTP" });
  }
});

export default router;
