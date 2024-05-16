const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    trim: true,
    select: false,
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin", "user", "seller"],
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/d381111/image/upload/v1626111111/default_user_image_y0q12o.png",
  },
});
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
