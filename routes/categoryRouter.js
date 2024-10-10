const { Router } = require("express");
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getStartCategory)
categoryRouter.get('/new', categoryController.createCategoryGet)
categoryRouter.get('/:categoryName', categoryController.getCategory)

categoryRouter.post('/new', categoryController.createCategoryPost)

module.exports = categoryRouter;