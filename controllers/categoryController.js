const db = require("../db/queries");

function getStartCategory(req, res) {
    res.render('category')
}

async function getCategory(req, res) {
    const category = req.params.categoryName;
    const carsInCategory = await db.getAllCarsInCategory(category)
    res.render('category', {param: req.params, carsInCategory: carsInCategory})
    console.log(req.params)
    console.log(category)
    console.log(carsInCategory)
}

function createCategoryGet(req, res) {
    res.render('createCategory', {param: req.params})
    console.log(req.params)
}

function updateCategoryGet(req, res) {
    res.render('updateCategory', {param: req.params})
    console.log('update category page',req.params)
}

async function createCategoryPost(req, res) {
    const {category} = req.body;
    await db.insertCategory(category);
    console.log('category posted')
    res.redirect('/')
}

function updateCategoryPost(req, res) {
    console.log('category updated')
}

module.exports = {
    getStartCategory, 
    getCategory, 
    createCategoryGet, 
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost
};