const { Router } = require("express");
const carController = require('../controllers/carController')
const carRouter = Router();

carRouter.get('/', carController.getStartCar)
carRouter.get('/new', carController.createCarGet)
carRouter.get('/:carName', carController.getCar)

carRouter.post('/new', carController.createCarPost)

module.exports = carRouter;