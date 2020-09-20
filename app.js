const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const aboutRouter = require("./routes/about");
const contributeRouter = require("./routes/contribute");
const simulationsRouter = require("./routes/simulations");
const simplePendulum = require("./routes/simplePendulum");
const elasticPendulum = require("./routes/elasticPendulum");
const forceTableRouter = require("./routes/force_table");
const collisionRouter = require("./routes/collision");
const nBodyRouter = require("./routes/nBody");
const drag = require("./routes/drag");
const coupledPendulum = require("./routes/coupledPendulum");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/contribute", contributeRouter);
app.use("/simulations", simulationsRouter);
app.use("/simulations/simplePendulum", simplePendulum);
app.use("/simulations/elasticPendulum", elasticPendulum);
app.use("/simulations/force_table", forceTableRouter);
app.use("/simulations/collision", collisionRouter);
app.use("/simulations/nBody", nBodyRouter);
app.use("/simulations/coupledPendulum", coupledPendulum);
app.use("/simulations/drag", drag);

// remove before pushing to github
app.listen(3000, function () {
  console.log("Server running on port 3000");
});
// Stylesheets
app.use(express.static(__dirname + "/public"));
module.exports = app;
