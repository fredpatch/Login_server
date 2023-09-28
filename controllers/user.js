// import models
const { isValidObjectId } = require("mongoose");
const userModel = require("../models/User");
const VerificationToken = require("../models/verificationToken");
const ResetToken = require("../models/resetToken");

// helpers import
const { sendError, createRandomBytes } = require("../utils/helpers");
const {
  generateOtp,
  mailTransport,
  generateEmailTemplate,
  plainEmailTemplate,
  generatePasswordTemplate,
} = require("../utils/mail");

// json web token
const jwt = require("jsonwebtoken");


exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) return sendError(res, "This email already exists!");
  console.log("Creating newUser object...");
  const newUser = new userModel({
    name,
    email,
    password,
  });

  console.log("Generating OTP...");
  const OTP = generateOtp();
  console.log("Creating verificationToken object...");
  const verificationToken = new VerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  console.log("Saving verificationToken...");
  await verificationToken.save();
  console.log("Saving newUser...");
  await newUser.save();

  console.log("Sending email...");
  mailTransport().sendMail({
    from: "emailverification@email.com",
    to: newUser.email,
    subject: "Verify new user account OTP",
    html: generateEmailTemplate(OTP),
  });

  console.log("Sending response...");
  res.json({
    success: true,
    user: {
      name: newUser.name,
      email: newUser.email,
      id: newUser._id,
      verified: newUser.verified,
    },
  });
};

/* SignIn with JsonWebToken  */
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim())
      return sendError(res, "email / password missing!");

    const user = await userModel.findOne({ email });
    if (!user) return sendError(res, "User not found!");

    const isMatched = await user.comparePassword(password);
    if (!isMatched) return sendError(res, "email / password does not match!");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      user: { name: user.name, email: user.email, id: user._id, token },
    });
  } catch (error) {
    sendError(res, error.message, 500);
  }
};

exports.verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  console.log("Received request body:", req.body);

  if (!userId || !otp)
    return sendError(res, "Invalid request missing parameters!");

  if (!isValidObjectId(userId)) return sendError(res, "Invalid user id!");

  const user = await userModel.findById(userId);
  if (!user) return sendError(res, "Sorry, user not found!");
  if (user.verified) return sendError(res, "Account already verified!");

  const token = await VerificationToken.findOne({ owner: user._id });
  if (!token) return sendError(res, "Sorry, user not found!");

  const isMatched = await token.compareToken(otp);
  if (!isMatched) return sendError(res, "Please provide a valid token!");

  user.verified = true;
  // delete token after user found
  await VerificationToken.findByIdAndDelete(token._id);
  await user.save();

  mailTransport().sendMail({
    from: "emailverification@email.com",
    to: user.email,
    subject: "Account verified",
    html: plainEmailTemplate(
      `${user.name}`,
      "Welcome to the team, we hope you will enjoy your time with us. "
    ),
  });

  res.json({
    success: true,
    message: "Email has been verified",
    user: { name: user.name, email: user.email, id: user._id },
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Please provide valid email!");

  const user = await userModel.findOne({ email });
  if (!user) return sendError(res, "User not found, invalid request!");

  const token = await ResetToken.findOne({ owner: user._id });
  if (token)
    return sendError(
      res,
      "Only after one after you can request for another token!"
    );

  const randomBytes = await createRandomBytes();
  const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
  await resetToken.save();

  mailTransport().sendMail({
    from: "security@email.com",
    to: user.email,
    subject: "Forgot Password",
    html: generatePasswordTemplate(
      `https://financial-dashboard-password-reset-form.onrender.com/reset-password?token=${randomBytes}&id=${user._id}`
    ),
  });

  res.json({
    success: true,
    message: "Password reset link, sent to your email",
  });
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;

  const user = await userModel.findById(req.user._id);
  if (!user) return sendError(res, "user not found!");

  const isSamePass = await user.comparePassword(password);
  if (isSamePass) return sendError(res, "new password must be different!");

  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, "Password must be 8 to 20 characters long!");

  user.password = password.trim();
  await user.save();

  await ResetToken.findOneAndDelete({ owner: user._id });

  mailTransport().sendMail({
    from: "security@email.com",
    to: user.email,
    subject: "Password restored",
    html: plainEmailTemplate(`${user.name}`, "Password reset successfully. "),
  });

  res.json({
    success: true,
    message: "Password reset successfully",
  });
};
