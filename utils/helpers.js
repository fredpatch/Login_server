const crypto = require("crypto");

// error sender
exports.sendError = (res, error, status = 401) => {
  res.status(status).json({ success: false, error });
};

// random bytes generator
exports.createRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);

      const token = buff.toString("hex");
      resolve(token);
    });
  });
