// IMPORT THE REQUIRED MODULES AND ROUTE DEFINITIONS
const expoPushToken = require("express").Router();
const { setExpoPushToken } = require("./../middleware/expoToken");

// Backend route to receive Expo push token
expoPushToken.post("/expo-push-token", (req, res) => {
  const { token } = req.body;

  // Save the token to use it for sending notifications
  setExpoPushToken(token);

  console.log("Received Expo push token:", token);
  res.status(200).send("Token received successfully.");
});

module.exports = expoPushToken;
