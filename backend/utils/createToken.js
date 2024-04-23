// import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });

//   // Set JWT as an HTTP-Only Cookie
//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== "development",
//     sameSite: "none",
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//   });

//   return token;
// };

// export default generateToken;

import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure in production
    // sameSite: process.env.NODE_ENV === "development" ? "none" : "strict", // Adjust sameSite based on environment
    sameSite: "none", // Adjust sameSite based on environment
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
