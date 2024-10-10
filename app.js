require("dotenv").config();
// Packages
const express = require('express');
const path = require("node:path");

// Path to css file
const assetsPath = path.join(__dirname, "/public");

// Port
const PORT = process.env.PORT || 3000;

// Routers
const indexRouter = require('./routes/indexRouter')
const categoryRouter = require('./routes/categoryRouter')
const carRouter = require('./routes/carRouter')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views/pages"));
app.set("view engine", "ejs");

// Routes
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/car', carRouter)


app.listen(process.env.PORT, () => console.log('App running on port', PORT))