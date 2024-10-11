const db = require("../db/queries");

function getStartCar(req, res) {
    res.render('car')
}

async function getCar(req, res) {
    const id = req.params.carId
    const car = await db.getCar(id)
    res.render('car', {car: car, param: req.params})
    console.log('get car', car)
}

function createCarGet(req, res) {
    res.render('createCar', {param: req.params})
    console.log('create form get', req.params)
}

function updateCarGet(req, res) {
    res.render('updateCar', {param: req.params})
    console.log('update page', req.params)
}

function createCarPost(req, res) {
    console.log('car posted')
}

function updateCarPost(req, res) {
    console.log('car updated')
}

module.exports = {
    getStartCar, 
    getCar, 
    createCarGet, 
    updateCarGet, 
    createCarPost,
    updateCarPost
};