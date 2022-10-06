const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const env = require('dotenv');

var port = process.env.PORT || 4000;
const MongoClient = require("mongodb").MongoClient;
const lessonsRoute = require("./app/routes/lessons.route");
const writenTestsRoute = require("./app/routes/writenTests.route");
const mcqTestsRoute = require("./app/routes/mcqTests.route");
const dbConfig = require("./config/db.config");
const TagRoute = require("./app/routes/Tag.route");
const StudentLesson = require("./app/routes/studentLesson.route");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

mongoose.set("useCreateIndex", true);

app.use("/api/lesson", lessonsRoute);
app.use("/api/writenTests", writenTestsRoute);
app.use("/api/tag", TagRoute);
app.use("/api/mcq", mcqTestsRoute);
app.use("/api/studentLesson", StudentLesson);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);

  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false ,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database now");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// open server
app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
