const { Expo } = require("expo-server-sdk");
const { getExpoPushToken } = require("./../middleware/expoToken");

const expo = new Expo();

// Function to send a push notification using Expo
const sendPushNotification = async (message) => {
  // Get the Expo push token from the middleware
  const token = getExpoPushToken();

  const messages = [];

  // Check if the token is a valid Expo push token
  if (!Expo.isExpoPushToken(token)) {
    console.error("Invalid Expo Push Token");
    return;
  }

  // Create a message with the given data
  messages.push({
    to: token,
    sound: "default",
    title: "Financial Dashboard",
    body: message,
    data: { someData: "goes here" }, // You can send additional data
  });

  // Send the message in chunks (if needed)
  const chunks = expo.chunkPushNotifications(messages);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      // Send the chunk of messages
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }
};

module.exports = sendPushNotification;
