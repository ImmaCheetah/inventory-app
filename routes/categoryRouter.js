const { Router } = require("express");
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getStartCategory)
categoryRouter.get('/new', categoryController.createCategoryGet)
categoryRouter.get('/:categoryId', categoryController.getCategory)
categoryRouter.get('/:categoryId/update', categoryController.updateCategoryGet)

categoryRouter.post('/new', categoryController.createCategoryPost)
categoryRouter.post('/:categoryId/update', categoryController.updateCategoryPost)
// categoryRouter.post('/:categoryId', categoryController.deleteCategoryPost)

module.exports = categoryRouter;