const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Errors: " + err));
});

router.route("/add").post((req, res) => {
  const usernameInput = req.body.username;
  const newUser = new User({ username: usernameInput });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Errors: " + err));
});

module.exports = router;
