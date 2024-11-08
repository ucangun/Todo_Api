"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const mongoSanitize = require("express-mongo-sanitize");

// db connection
require("./server");

const PORT = process.env.PORT || 8000;

/********************************************************************/

// Middlewares:

app.use(express.json());
require("express-async-errors");

app.use("/todo", require("./src/routes/todoRouter"));

// catch errors
app.use(require("./src/middlewares/errorHandler"));

// Sanitize user input to prevent NoSQL injection attacks
app.use(mongoSanitize());

/********************************************************************/

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
