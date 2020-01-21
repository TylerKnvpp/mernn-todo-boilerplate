const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = process.env.MONGO_ACCESS;

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

const todosRouter = require("./routes/todos");
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);
app.use("/todos", todosRouter);

// launch our backend into a port
app.listen(PORT, () => console.log(`LISTENING ON PORT ${process.env.PORT}`));
