const router = require("express").Router();
let ToDo = require("../models/todos.model");

router.route("/").get((req, res) => {
  ToDo.find()
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const todo = req.body.todo;

  const newToDo = new ToDo({
    username,
    todo
  });

  newToDo
    .save()
    .then(() => res.json("Task added!"))
    .catch(err => res.status(400).json("Errors: " + err));
});

module.exports = router;
