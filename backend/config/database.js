const mongoose = require("mongoose");

require("dotenv").config();

const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected  succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectdb;
