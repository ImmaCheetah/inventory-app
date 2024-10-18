require("dotenv").config();
const db = require("./db/queries");
const CustomError = require("./errors/CustomError");

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

app.use(fetchCategories)

// Routes
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/car', carRouter)

// Pass in categories response object in order to display categories 
// in sidebar
async function fetchCategories(req, res, next) {
  const categories = await db.getAllCategories()
  res.locals.categories = categories
  next()
}

app.use((req, res, next) => {
  next(
      new CustomError('Page Not Found', 'The page you are looking for does not exist', 404)
  )
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).render('error', {error: err});
  });

app.listen(process.env.PORT, () => console.log('App running on port', PORT))