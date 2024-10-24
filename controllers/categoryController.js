const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
    body('category').trim()
    .isAlpha().withMessage('Can only contain letters')
    .isLength({ min: 1, max: 20 }).withMessage('Must be between 1 and 20 characters')
]

async function getCategory(req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        const carsInCategory = await db.getAllCarsInCategory(categoryId)
        res.render('category', {
            param: req.params, 
            carsInCategory: carsInCategory,
            title: 'Category'
        })
    } catch (error) {
        next(new Error("Couldn't get category"))
    }
}

function createCategoryGet(req, res) {
    res.render('createCategory', {param: req.params, title: 'New Category'})
}

async function updateCategoryGet(req, res, next) {
    try {
        const errors = validationResult(req);
        const categoryId = parseInt(req.params.categoryId)
        const category = await db.findCategory(categoryId)
        res.render('updateCategory', {
            param: req.params, 
            category: category, 
            title: 'Update Category',
            errors: errors.array()
        })
    } catch (error) {
        next(new Error("Couldn't get category page"))
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
                title: 'New Category', 
                errors: errors.array()
            })
        }
        await db.insertCategory(category);
        res.redirect('/')
    } catch (error) {
        // console.error("Error retrieving author:", error);
        // res.status(500).render('error');
        console.log(error)
        next(new Error("Couldn't make category"))
        // console.log('catch error in createCategoryPost')
    }
}

async function updateCategoryPost(req, res, next) {
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
                title: 'Update Category', 
                errors: errors.array()
            })
        }
        await db.updateCategory(category, categoryId)
        console.log('category updated')
        res.redirect('/')
    } catch (error) {
        next(new Error("Couldn't update category"))
    }
}

async function deleteCategoryPost(req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        if (req.body.password === process.env.DELETE_PASSWORD) {
            await db.deleteCategory(categoryId);
            res.redirect('/')
            return;
        } else {
            return;
        }
    } catch (error) {
        next(new Error("Couldn't delete category"))
    }
}

module.exports = {
    getCategory, 
    createCategoryGet, 
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost,
    deleteCategoryPost,
    validateCategory
};