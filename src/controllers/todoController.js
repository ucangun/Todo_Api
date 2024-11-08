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

  read: async (req, res) => {
    const { id } = req.params;
    const todo = await Todos.findById(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    res.status(200).send({
      error: false,
      message: "Todo retrieved successfully",
      data: todo,
    });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const todo = await Todos.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      throw new Error("Todo not found");
    }
    res.status(202).send({
      error: false,
      message: "Todo updated successfully",
      data: todo,
    });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const todo = await Todos.findByIdAndDelete(id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    res.status(204).send({
      error: false,
      message: "Todo deleted successfully",
    });
  },
};
