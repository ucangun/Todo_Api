"use strict";

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
      maxlength: 150,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "Todos",
    timestamps: true,
  }
);

const Todos = mongoose.model("Todos", TodoSchema);

module.exports = Todos;
