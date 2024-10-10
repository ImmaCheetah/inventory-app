const db = require("../db/queries");

async function getIndex(req, res) {
    const cars = await db.getAllCarModels()
    console.log(cars);
    res.render('index')
}

module.exports = {getIndex};