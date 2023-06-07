import nodemailer from "nodemailer";

export const sendMail = async (email, generatedOTP) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_KEY,
    },
  });

  const mailOptions = {
    from: "Mintables <markeplacemintables@gmail.com> ",
    to: email,
    subject: "Verify your email",
    html: `<p>${generatedOTP}</p>`,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    return { message: "SUCCESS", response: response.response };
  } catch (err) {
    console.log(err);
    return { message: "FAILED", response: err };
  }
};
