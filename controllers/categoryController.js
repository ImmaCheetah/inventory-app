const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
    body('category').trim()
    .isAlpha().withMessage('Can only contain letters')
    .isLength({ min: 1, max: 20 }).withMessage('Must be between 1 and 20 characters')
]

async function getCategory(req, res) {
    try {
        const categoryId = req.params.categoryId;
        const carsInCategory = await db.getAllCarsInCategory(categoryId)
        res.render('category', {param: req.params, carsInCategory: carsInCategory})
    } catch (error) {
        next(new Error("Couldn't get category"))
    }
}

function createCategoryGet(req, res) {
    res.render('createCategory', {param: req.params})
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
                errors: errors.array()
            })
        }
        await db.insertCategory();
        console.log('category posted')
        res.redirect('/')
    } catch (error) {
        // console.error("Error retrieving author:", error);
        // res.status(500).render('error');
        next(new Error("Couldn't make category"))
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
        next(new Error("Couldn't update category"))
    }
}

async function deleteCategoryPost(req, res) {
    try {
        const categoryId = req.params.categoryId;
        if (req.body.password === process.env.DELETE_PASSWORD) {
            await db.deleteCategory(categoryId);
            console.log('deleted category')
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