// user validation for the forget password
const { isValidObjectId } = require("mongoose");
const { sendError } = require("../utils/helpers");
const userModel = require("../models/User");
const ResetToken = require("../models/resetToken");

exports.isResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;
  if (!token || !id) return sendError(res, "Invalid request!");

  if (!isValidObjectId(id)) return sendError(res, "Invalid user!");

  const user = await userModel.findById(id);
  if (!user) return sendError(res, "User not found!");

  const resetToken = await ResetToken.findOne({ owner: user._id });
  if (!resetToken) return sendError(res, "reset token not found!");

  const isValid = await resetToken.compareToken(token);
  if (!isValid) return sendError(res, "Reset token is not valid!");

  req.user = user;

  next();
};
