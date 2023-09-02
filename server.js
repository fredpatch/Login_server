/* LOGIN AND SIGNUP WITH MONGODB */
require("./config/db");
require("mongodb");
require("morgan");

const cors = require("cors");
const app = require("express")();
const PORT = 3000;
const UserRoute = require("./api/User");
const dbOperations = require("./api/dbOperations");

// for accepting data
const bodyParser = require("express").json;
const morgan = require("morgan");
app.use(bodyParser());
app.use(morgan("common"));
app.use(cors());

// routes
app.use("/user", UserRoute);
app.use("/epdb", dbOperations);

/* TRIAL CONNECTION TO LOCALHOST MYSQL */
const server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log("** BACKEND ONLINE **");
  //console.log(`Server running at Port : http://localhost:${PORT} `);
});
