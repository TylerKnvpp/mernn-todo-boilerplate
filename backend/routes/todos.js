const router = require("express").Router();
let Todo = require("../models/todos.model");

router.route("/").get((req, res) => {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

router.route("/completed").get((req, res) => {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      let completedTodos = todos.filter(todo => todo.todo_completed);
      res.json(completedTodos);
    }
  });
});

router.route("/incomplete").get((req, res) => {
  Todo.find(function(err, todos) {
    if (err) {
      console.log(err);
    } else {
      let incompleteTodos = todos.filter(todo => !todo.todo_completed);
      res.json(incompleteTodos);
    }
  });
});

router.route("/:id").get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

router.route("/add").post((req, res) => {
  const todo = new Todo(req.body);

  todo
    .save()
    .then(todo => {
      res
        .status(200)
        .json({ addedTodo: todo, todos: "Task added succesfully." });
    })
    .catch(err => {
      res.status(400).json({ todos: "ERROR: Task could not be added." });
    });
});

router.route("/update/:id").post(function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then(todo => {
        res.json("Task Completed!");
      })
      .catch(err => {
        res.status(400).send("Update not possible");
      });
  });
});

module.exports = router;
