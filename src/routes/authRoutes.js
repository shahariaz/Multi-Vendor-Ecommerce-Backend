const router = require("express").Router();
const authControllers = require("../controllers/authControllers");


router.post("/admin-login", authControllers.admin_login);
router.get("/check", (req, res) => {
  res.status(200).json({
    message: "Admin Login Successful",
  });
});
module.exports = router;
