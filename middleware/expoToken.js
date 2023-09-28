// expoToken.js
let expoPushToken = null;

const setExpoPushToken = (token) => {
  expoPushToken = token;
};

const getExpoPushToken = () => {
  return expoPushToken;
};

module.exports = { setExpoPushToken, getExpoPushToken };
