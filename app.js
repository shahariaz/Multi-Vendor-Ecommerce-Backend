const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
// importing file

const adminRoutes = require("./src/routes/authRoutes");
const createAdminRoutes = require("./src/routes/secretRoutes/createAdmin");
const corsOptions = require("./src/config/corsOptions");

const ErrorHandler = require("./src/middlewares/error");
// declearing App
const app = express();
// setting up some important tools
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
if (process.env.NODE_ENV !== "production") {
  // setting up some dev-tools
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

// user routes
app.use("/api", adminRoutes);
app.use("/secret", createAdminRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to the API");
});

// Error handlers
app.use(ErrorHandler);
// exporting App
module.exports = app;
