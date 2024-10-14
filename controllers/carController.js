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

async function createCarGet(req, res) {
    const categories = await db.getAllCategories()
    res.render('createCar', {param: req.params, categories: categories})
    console.log('create form get', req.params)
}

async function updateCarGet(req, res) {
    const carId = req.params.carId;
    const car = await db.findCar(carId)
    res.render('updateCar', {param: req.params, car: car})
    console.log('update page', car)
}

async function createCarPost(req, res) {
    const {brand, model, category, description} = req.body;
    await db.insertCar(brand, model, description, category);

    console.log('car posted', brand, model, category, description);
    res.redirect('/');
}

async function updateCarPost(req, res) {
    const {brand, model, description} = req.body;
    const carId = req.params.carId;
    await db.updateCar(brand, model, description, carId)
    console.log('car updated')

    res.redirect('/')
}

module.exports = {
    getStartCar, 
    getCar, 
    createCarGet, 
    updateCarGet, 
    createCarPost,
    updateCarPost
};