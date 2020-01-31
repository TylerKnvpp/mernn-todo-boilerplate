const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({}, { timestamps: true });

module.exports = mongoose.model("ToDo", Todo);
