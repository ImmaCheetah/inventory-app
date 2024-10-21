require("dotenv").config();
const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const validateCar = [
    body('brand').trim()
    .isAlpha().withMessage('Brand can only contain letters')
    .isLength({ min: 1, max: 25 }).withMessage('Brand must be between 1 and 25 characters'),
    body('model').trim()
    .isLength({ min: 1, max: 20 }).withMessage('Model must be between 1 and 20 characters')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Model can only contain letters, numbers and dashes'),
    body('description').trim()
    .isLength({ min: 0, max: 1000 }).withMessage('Description must be less than 1000 characters')
]

function getStartCar(req, res) {
    res.render('car')
}

async function getCar(req, res, next) {
    console.log(res.locals)
    const id = req.params.carId
    try {
        const car = await db.getCar(id)
        if (car.length === 0) {
            res.status(404).send("Car not found");
            return;
        }
        res.render('car', {car: car, param: req.params})
    } catch (error) {
        console.log('Get car controller', error)
        next(error)
    }
}

async function createCarGet(req, res) {
    try {
        const categories = await db.getAllCategories()
        res.render('createCar', {param: req.params, categories: categories})
        console.log('create form get', req.params)
    } catch (error) {
        console.log('create car get controller', error)
    }
}

async function updateCarGet(req, res) {
    const carId = req.params.carId;
    const car = await db.findCar(carId)
    res.render('updateCar', {param: req.params, car: car})
    console.log('update page', car)
}

async function createCarPost(req, res) {
    try {
        const {brand, model, category, description} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .render('createCar', {
                param: req.params,  
                errors: errors.array()
            })
        }
        await db.insertCar(brand, model, description, category);
        console.log('car posted', brand, model, category, description);
        res.redirect('/');
    } catch (error) {
        next(error)
    }
}

async function updateCarPost(req, res) {
    try {
        const {brand, model, description} = req.body;
        const carId = req.params.carId;
        const car = await db.findCar(carId)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .render('updateCar', {
                param: req.params,
                car: car,  
                errors: errors.array()
            })
        }
        await db.updateCar(brand, model, description, carId)
        console.log('car updated')
        res.redirect('/')
    } catch (error) {
        next(error)
    }
    
}

async function deleteCarPost(req, res) {
    const carId = req.params.carId;
    if (req.body.password === process.env.DELETE_PASSWORD) {
        await db.deleteCar(carId);
        console.log('deleted car')
        res.redirect('/')
        return;
    } else {
        return;
    }
}

module.exports = {
    getStartCar, 
    getCar, 
    createCarGet, 
    updateCarGet, 
    createCarPost,
    updateCarPost,
    deleteCarPost,
    validateCar
};