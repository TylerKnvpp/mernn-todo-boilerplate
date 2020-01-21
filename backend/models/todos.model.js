const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    username: { type: String },
    todo: { description: String }
  },
  {
    timestamps: true
  }
);

const ToDo = mongoose.model("ToDo", todoSchema);

module.exports = ToDo;
