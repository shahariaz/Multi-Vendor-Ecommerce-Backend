const authControllers = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/admin-login", authControllers.admin_login);
router.get("/check", (req, res) => {
  res.status(200).json({
    message: "Admin Login Successful",
  });
});
module.exports = router;
