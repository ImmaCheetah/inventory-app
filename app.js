require("dotenv").config();
// Packages
const express = require('express');
const path = require("node:path");

// Port
const PORT = process.env.PORT || 3000;

// Routers
const indexRouter = require('./routes/indexRouter')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// Routes
app.use('/', indexRouter)

app.listen(process.env.PORT, () => console.log('App running on port', PORT))