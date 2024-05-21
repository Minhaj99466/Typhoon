const express = require("express");
const path = require("path");
const nocache = require("nocache");
const mongoose = require('mongoose')
const session = require('express-session')


const app = express();

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/typhoon")

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'ambjhhhiyjba4467689havfa',
  resave: false,
  saveUninitialized: true
}));

app.use(nocache());

// USER ROUTE //
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);



app.listen(3000, () => {
  console.log("server is running 3000");
});