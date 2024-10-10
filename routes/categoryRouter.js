const { Router } = require("express");
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getStartCategory)
categoryRouter.get('/new', categoryController.createCategoryGet)
categoryRouter.get('/:categoryName', categoryController.getCategory)
categoryRouter.get('/:categoryName/update', categoryController.updateCategoryGet)

categoryRouter.post('/new', categoryController.createCategoryPost)
categoryRouter.post('/:categoryName/update', categoryController.updateCategoryPost)

module.exports = categoryRouter;