import jwt from "jsonwebtoken";

export const generateToken = (tokenSecret, email, expire) => {
  const token = jwt.sign({ email }, tokenSecret, {
    expiresIn: expire,
  });
  return token;
};
