const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsync = require("../utils/catchAsync");
const { createToken } = require("../utils/tokenCreate");

class authController {
  admin_login = catchAsync(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide the all fields!", 400));
      }
      // Find the admin by email
      const admin = await Admin.findOne({ email }).select("+password");
      if (!admin) {
        throw new ErrorHandler("Invalid email or password.", 400);
      }

      // Compare the passwords
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        throw new ErrorHandler("Invalid email or password.", 400);
      } else {
        let data = {
          name: admin.name,
          email: admin.email,
          image: admin.image,
        };
        const token = await createToken({
          id: admin._id,
          role: admin.role,
        });

        res.status(200).json({
          message: "Admin Login Successful",
          data,
          token,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
    const { email, password } = req.body;
  });
}

module.exports = new authController();
