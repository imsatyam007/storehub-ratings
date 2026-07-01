import jwt from "jsonwebtoken";
import env from "../config/env.js";

console.log("=== generateToken.js loaded ===");
console.log("ENV OBJECT:", env);

const generateToken = (user) => {
  console.log("Inside generateToken()");
  console.log("JWT_SECRET:", env.JWT_SECRET);

  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    }
  );
};

export default generateToken;