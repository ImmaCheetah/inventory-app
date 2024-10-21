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


async function getCar(req, res, next) {
    try {
        const id = req.params.carId
        const car = await db.getCar(id)
        if (car.length === 0) {
            res.status(404).send("Car not found");
            return;
        }
        res.render('car', {
            car: car, param: 
            req.params,
            title: 'Car'
        })
    } catch (error) {
        next(new Error("Couldn't get car"))
    }
}

async function createCarGet(req, res, next) {
    try {
        const categories = await db.getAllCategories()
        res.render('createCar', {
            param: req.params, 
            categories: categories,
            title: 'New Car'
        })
    } catch (error) {
        next(new Error("Couldn't get page"))
    }
}

async function updateCarGet(req, res, next) {
    try {
        const carId = req.params.carId;
        const car = await db.findCar(carId)
        res.render('updateCar', {
            param: req.params, 
            car: car,
            title: 'Update Car'
        })
    } catch (error) {
        next(new Error("Couldn't get update page"))
    }
}

async function createCarPost(req, res, next) {
    try {
        const {brand, model, category, description} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
            .status(400)
            .render('createCar', {
                param: req.params,
                title: 'New Car',  
                errors: errors.array()
            })
        }
        await db.insertCar(brand, model, description, category);
        res.redirect('/');
    } catch (error) {
        next(new Error("Couldn't create car"))
    }
}

async function updateCarPost(req, res, next) {
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
        res.redirect('/')
    } catch (error) {
        next(new Error("Couldn't update car"))
    }
    
}

async function deleteCarPost(req, res, next) {
    try {
        const carId = req.params.carId;
        if (req.body.password === process.env.DELETE_PASSWORD) {
            await db.deleteCar(carId);
            console.log('deleted car')
            res.redirect('/')
            return;
        } else {
            return;
        }
    } catch (error) {
        next(new Error("Couldn't delete car"))
    }
}

module.exports = {
    getCar, 
    createCarGet, 
    updateCarGet, 
    createCarPost,
    updateCarPost,
    deleteCarPost,
    validateCar
};