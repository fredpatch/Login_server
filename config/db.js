require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
