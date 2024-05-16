const express = require("express");
const Admin = require("../../models/adminModel");

const router = express.Router();

router.post("/create-admin", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const admin = Admin.create({ name: name, email: email, password: password });
  res.status(200).json({
    message: "Admin Created Successfully",
    admin,
  });
});
module.exports = router;
