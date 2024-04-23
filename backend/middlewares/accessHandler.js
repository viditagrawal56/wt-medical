const accessHandler = (req, res, next) => {
  console.log("Test");
  res.set("Access-Control-Allow-Origin", "https://wt-medical-1.onrender.com");
  res.set("Access-Control-Allow-Credentials", "true");
  next();
};

export default accessHandler;
