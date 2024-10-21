const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
    body('category').trim()
    .isAlpha().withMessage('Can only contain letters')
    .isLength({ min: 1, max: 20 }).withMessage('Must be between 1 and 20 characters')
]

function getStartCategory(req, res) {
    res.render('category')
}

async function getCategory(req, res) {
    console.log('locals', res.locals)
    const categoryId = req.params.categoryId;
    const carsInCategory = await db.getAllCarsInCategory(categoryId)
    res.render('category', {param: req.params, carsInCategory: carsInCategory})
    console.log('cars here in category', carsInCategory)
}

function createCategoryGet(req, res) {
    res.render('createCategory', {param: req.params})
    console.log(req.params)
}

async function updateCategoryGet(req, res) {
    try {
        const errors = validationResult(req);
        const categoryId = parseInt(req.params.categoryId)
        const category = await db.findCategory(categoryId)
        res.render('updateCategory', {
            param: req.params, 
            category: category, 
            errors: errors.array()
        })
        console.log('update category page', categoryId)
        console.log(category)
    } catch (error) {
        next(error)
    }
}

async function createCategoryPost(req, res, next) {
    try {
        const {category} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .render('createCategory', {
                param: req.params, 
                category: category, 
                errors: errors.array()
            })
        }
        await db.insertCategory(category);
        console.log('category posted')
        res.redirect('/')
    } catch (error) {
        next(error)
        // console.log('catch error in createCategoryPost')
    }
}

async function updateCategoryPost(req, res) {
    try {
        const {category} = req.body;
        const categoryId = parseInt(req.params.categoryId);
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .render('updateCategory', {
                param: req.params, 
                category: category, 
                errors: errors.array()
            })
        }
        await db.updateCategory(category, categoryId)
        console.log('category updated')
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

async function deleteCategoryPost(req, res) {
    const categoryId = req.params.categoryId;
    if (req.body.password === process.env.DELETE_PASSWORD) {
        await db.deleteCategory(categoryId);
        console.log('deleted category')
        res.redirect('/')
        return;
    } else {
        return;
    }
}

module.exports = {
    getStartCategory, 
    getCategory, 
    createCategoryGet, 
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost,
    deleteCategoryPost,
    validateCategory
};