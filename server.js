const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { route } = require("./src/routes/authRoutes");
const authRoutes = require("./src/routes/authRoutes");
const connectDB = require("./DB");

dotenv.config();

const app = express();

// Enable security headers
app.use(helmet());

// Compress response bodies
app.use(compression());

// Limit requests from the same IP address
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Enable CORS

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log HTTP requests
app.use(morgan("combined"));
app.use("/api", authRoutes);

// Define your routes here
// app.use('/api', require('./routes/api'));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server

const port = process.env.PORT || 8000;
app.listen(port, (error) => {
  if (error) {
    console.error(error);
    throw error;
  } else {
    console.info(
      `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
    connectDB();
  }
});
