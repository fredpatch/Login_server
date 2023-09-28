const express = require("express");
const router = express.Router();

// controller path
const {
  signUp,
  signIn,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/user");
// middleware for data validation
const { validateUser, validate } = require("../middleware/validator");
const { isResetTokenValid } = require("../middleware/user");

// signup route
router.post("/signup", validateUser, validate, signUp);

// sign-in route
router.post("/signin", signIn);

// verify email
router.post("/verify-email", verifyEmail);

// password forgot route
router.post("/forgot-password", forgotPassword);

// password reset route
router.post("/reset-password", isResetTokenValid, resetPassword);

// password reset route
router.get("/verify-token", isResetTokenValid, (req, res) => {
  res.json({ success: true });
});

module.exports = router;
