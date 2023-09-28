const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// password handler
const bcrypt = require("bcrypt");

const verificationTokenSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, expires: 3600, default: Date.now() },
});

/* METHODS TO HASH AND COMPARE TOKEN */

// method to hash password
verificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

// adding the method to compare the token
verificationTokenSchema.methods.compareToken = async function (token) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

module.exports = VerificationToken;
