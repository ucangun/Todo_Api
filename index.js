"use strict";

const express = require("express");
const app = express();
require("dotenv").config();

// db connection
require("./server");

const PORT = process.env.PORT || 8000;

/********************************************************************/

// Middlewares:

app.use(express.json());

app.use("/todo", require("./src/routes/todoRouter"));

/********************************************************************/

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
