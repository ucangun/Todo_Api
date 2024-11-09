"use strict";

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGOURI || "mongodb://localhost:27017/todoAPI", {
    connectTimeoutMS: 20000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB not connected:", error));

module.exports = mongoose;
