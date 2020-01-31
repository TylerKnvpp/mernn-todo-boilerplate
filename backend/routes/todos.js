const router = require("express").Router();
let Todo = require("../models/todos.model");

router.route("/").get((req, res) => {});

router.route("/completed").get((req, res) => {});

router.route("/incomplete").get((req, res) => {});

router.route("/:id").get((req, res) => {});

router.route("/add").post((req, res) => {});

router.route("/update/:id").post(function(req, res) {});

module.exports = router;
