const express = require("express");
const app = express();
const path = require("path");
const nocache = require("nocache");
const morgan = require("morgan");

const publicPath = path.join(__dirname, "public");
app.use(nocache());
app.use(express.static(publicPath));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// USER ROUTE //

const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

app.listen(3000, (req, res) => {
  console.log(`server is loading 3000,tyfooon `);
});
