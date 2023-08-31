const express = require("express");
const router = express.Router();

// mongodb user model
const userModel = require("../models/User");

// password handler
const bcrypt = require("bcrypt");

//signup route
router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty fields returned!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({ status: "FAILED", message: "invalid Email" });
  } else if (password.length < 8) {
    res.json({
      status: "FAILED",
      message: "Password must be at least 8 characters long",
    });
  } else {
    // checking if user already exist
    userModel
      .find({ email })
      .then((result) => {
        if (result.length) {
          //A user already exist
          res.json({
            status: "FAILED",
            message: "User with this email already exist",
          });
        } else {
          // Try and create a new User

          // password hashing
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new userModel({
                name,
                email,
                password: hashedPassword,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "SingUp successful",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "Error while saving user account",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error occurred while hashing the password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user!",
        });
      });
  }
});

//sign-in route
router.post("/signin", (req, res) => {
  let { email, password } = req.body;

  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // check if user exist
    userModel
      .find({ email })
      .then((data) => {
        if (data.length) {
          // User exist

          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password supplied!",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "Error occurred while comparing",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid ID",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }
});

module.exports = router;
