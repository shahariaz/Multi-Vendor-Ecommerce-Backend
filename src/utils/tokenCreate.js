const jwt = require("jsonwebtoken");

module.exports.createToken = async (data) => await jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
