const { Router } = require("express");
const carController = require('../controllers/carController')
const {validateCar} = require('../controllers/carController')
const carRouter = Router();

carRouter.get('/', carController.getStartCar)
carRouter.get('/new', carController.createCarGet)
carRouter.get('/:carId', carController.getCar)
carRouter.get('/:carId/update', carController.updateCarGet)

carRouter.post('/new', validateCar, carController.createCarPost)
carRouter.post('/:carId/update', validateCar, carController.updateCarPost)
carRouter.post('/:carId', carController.deleteCarPost)

module.exports = carRouter;