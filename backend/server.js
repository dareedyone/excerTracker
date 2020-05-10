const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.URI;
const exercisesRouter = require("./routes/excercises");
const usersRouter = require("./routes/users");
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB database connection established")
);
connection.on("error", (err) => console.log("conn error:", err));
//midlewares
app.use(cors());
//use in place of bodyparser
app.use(express.json());

//attach declare routes
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log("server is running on port: " + port);
});
