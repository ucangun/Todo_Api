"use strict";

const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todoController");

const { list, create } = TodoController;

router.route("/").get(list).post(create);

module.exports = router;
