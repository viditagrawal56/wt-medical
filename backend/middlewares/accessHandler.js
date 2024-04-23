const accessHandler = () => {
  console.log("Test");
  res.set("Access-Control-Allow-Origin", "https://wt-medical-1.onrender.com");
};

export default accessHandler;
