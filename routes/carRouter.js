const { Router } = require("express");
const carController = require('../controllers/carController')
const carRouter = Router();

carRouter.get('/', carController.getStartCar)
carRouter.get('/new', carController.createCar)
carRouter.get('/:carName', carController.getCar)

module.exports = carRouter;