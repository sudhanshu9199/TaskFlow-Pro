const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("server connected to DB.");
    })
    .catch((err) => {
      console.log("server error", err);
    });
}

module.exports = connectDB;