const Admin = require("../models/adminModel");

class authController {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const admin = await Admin.findById("6645e73afdda0ad593b621db");
    console.log(admin);
    try {
    } catch (error) {}
  };
}

module.exports = new authController();
