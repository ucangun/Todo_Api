"use strict";

const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todoController");

const { list, create, read, update, delete: deleteTodo } = TodoController;

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(deleteTodo);

module.exports = router;
