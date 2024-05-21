const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const nocache = require("nocache");
const session = require("express-session");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/typhoon");


const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "ambjhhhiyjba4467689havfa",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(nocache());

// USER ROUTE //
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

// ADMIN ROUTE //

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

// DISTRIBUTOR ROUTE //

const distributorRoute = require("./routes/distributorRoute");
app.use("/distributor", distributorRoute);

app.listen(3000, () => {
  console.log(`server is loading 3000,tyfooon `);
});
