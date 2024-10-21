const { Router } = require("express");
const categoryController = require('../controllers/categoryController')
const {validateCategory} = require('../controllers/categoryController')
const categoryRouter = Router();

categoryRouter.get('/new', categoryController.createCategoryGet)
categoryRouter.get('/:categoryId', categoryController.getCategory)
categoryRouter.get('/:categoryId/update', categoryController.updateCategoryGet)

categoryRouter.post('/new', validateCategory, categoryController.createCategoryPost)
categoryRouter.post('/:categoryId/update', validateCategory, categoryController.updateCategoryPost)
categoryRouter.post('/:categoryId', categoryController.deleteCategoryPost)

module.exports = categoryRouter;