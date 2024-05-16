const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const ErrorHandler = require("./src/utils/ErrorHandler");

//declearing App
const app = express();
//setting up some important tools
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
if (process.env.NODE_ENV !== "production") {
  //setting up some dev-tools
  app.use(morgan("combined"));
  require("dotenv").config({
    path: "config/.env",
  });
}
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//user routes

//Error handlers
app.use(ErrorHandler);
//exporting App
module.exports = app;
