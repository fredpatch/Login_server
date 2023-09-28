/* LOGIN AND SIGNUP WITH MONGODB */

// import requirement
require("dotenv").config();
require("morgan");
const db = require("./config/db");

const cors = require("cors");
const app = require("express")();

const PORT = process.env.PORT || 9000;

/* MySQL EVENTS WATCHER */
const { checkChanges } = require("./config/changeChecker"); // Assuming you have a module for change checking
// const mysql = require("mysql2");
// const mySQLEvents = require("@rodrigogs/mysql-events");

// const dbConfig = {
//   host: process.env.DB_HOST || "localhost",
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_USER_PASS,
//   database: process.env.DB_EPDB || "epdb",
// };

// const program = async () => {
//   const instance = new mySQLEvents(dbConfig, {
//     startAtEnd: true,
//     excludedSchemas: {
//       mysql: true,
//     },
//   });

//   await instance.start();

//   instance.addTrigger({
//     name: "Whole database instance",
//     expression: "*.*",
//     statement: mySQLEvents.STATEMENTS.ALL,
//     onEvent: (event) => {
//       console.log(`Database events: ${event}`);
//     },
//   });

//   instance.on(mySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
//   instance.on(mySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
// };

// program()
//   .then(() => console.log("Waiting for database events..."))
//   .catch(console.error);

const UserRoute = require("./routes/User");
const dbOperations = require("./routes/dbOperations");
const expoPushToken = require("./routes/expoPushTokens");
var body_Parser = require("body-parser");

// for parsing application/json
app.use(body_Parser.json({ type: "application/json" }));
// for parsing application/x-www-form-urlencoded
app.use(body_Parser.urlencoded({ extended: true }));

// for accepting data
const bodyParser = require("express").json;
const morgan = require("morgan");
app.use(bodyParser());
app.use(morgan("common"));
app.use(cors());

// routes
app.use("/user", UserRoute);
app.use("/epdb", dbOperations);
app.use("/expo", expoPushToken);

/* TRIAL CONNECTION TO LOCALHOST MYSQL */
const s = app.listen(PORT, () => {
  var host = s.address().address;
  var port = s.address().port;
  console.log("** BACKEND ONLINE **");

  // Start the change checker
  setInterval(checkChanges, 10000);
});

// console.log(`Server running at Port : http://localhost:${PORT} `);
