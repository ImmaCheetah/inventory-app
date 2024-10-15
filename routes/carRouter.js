const { Router } = require("express");
const carController = require('../controllers/carController')
const carRouter = Router();

carRouter.get('/', carController.getStartCar)
carRouter.get('/new', carController.createCarGet)
carRouter.get('/:carId', carController.getCar)
carRouter.get('/:carId/update', carController.updateCarGet)

carRouter.post('/:carId/update', carController.updateCarPost)
carRouter.post('/:carId', carController.deleteCarPost)
carRouter.post('/new', carController.createCarPost)

module.exports = carRouter;