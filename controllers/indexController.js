const db = require("../db/queries");

async function getIndex(req, res) {
    const cars = await db.getAllCars()
    const categories = await db.getAllCategories()
    console.log(cars);
    res.render('index', {categories: categories, cars: cars})
}



module.exports = {getIndex};