const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// password handler
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  verified: { type: Boolean, default: false, required: true },
});

/* METHODS TO HASH AND COMPARE PASSWORDS */

// method to hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

// adding the method to compare the password
userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password);
  return result;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
