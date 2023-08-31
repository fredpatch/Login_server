// require mongodb
require("./config/db");

require("morgan");

const app = require("express")();
const PORT = 3000;
const UserRoute = require("./api/User");

// for accepting data
const bodyParser = require("express").json;
const morgan = require("morgan");
app.use(bodyParser());
app.use(morgan("common"));

//routes
app.use("/user", UserRoute);

app.listen(PORT, () => {
  console.log(`Server running at Port : http://localhost:${PORT} `);
});
