const db = require("../db/queries");

function getStartCategory(req, res) {
    res.render('category')
}

async function getCategory(req, res) {
    const categoryId = req.params.categoryId;
    const carsInCategory = await db.getAllCarsInCategory(categoryId)
    res.render('category', {param: req.params, carsInCategory: carsInCategory})
    console.log(categoryId)
    console.log(carsInCategory)
}

function createCategoryGet(req, res) {
    res.render('createCategory', {param: req.params})
    console.log(req.params)
}

async function updateCategoryGet(req, res) {
    const categoryId = parseInt(req.params.categoryId)
    const category = await db.findCategory(categoryId)
    res.render('updateCategory', {param: req.params, category: category})
    console.log('update category page', categoryId)
    console.log(category)
}

async function createCategoryPost(req, res) {
    const {category} = req.body;
    await db.insertCategory(category);
    console.log('category posted')
    res.redirect('/')
}

async function updateCategoryPost(req, res) {
    const {category} = req.body;
    const categoryId = parseInt(req.params.categoryId)
    await db.updateCategory(category, categoryId)
    console.log('category updated')
    res.redirect('/')
}

module.exports = {
    getStartCategory, 
    getCategory, 
    createCategoryGet, 
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost
};