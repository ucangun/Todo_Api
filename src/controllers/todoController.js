const Todos = require("../models/todoModel");

module.exports = {
  list: async (req, res) => {
    const todos = await Todos.find();
    res.status(200).send({
      error: false,
      message: "Todos retrieved successfully",
      data: todos,
    });
  },

  create: async (req, res) => {
    const newTodo = await Todos.create({
      text: req.body.text,
    });
    res.status(201).send({
      error: false,
      message: "Todo created successfully",
      data: newTodo,
    });
  },
};
