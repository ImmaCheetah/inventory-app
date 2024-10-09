const { Router } = require("express");
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getStartCategory)
categoryRouter.get('/:categoryName', categoryController.getCategory)

module.exports = categoryRouter;