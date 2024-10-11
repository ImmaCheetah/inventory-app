const pool = require("./pool");

async function getAllCars() {
    const {rows} = await pool.query("SELECT * FROM cars");
    return rows;
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT category FROM categories");
    return rows;
}

async function getCar(id) {
    const {rows} = await pool.query("SELECT * FROM cars WHERE cars.car_id = ($1)", [id]);
    return rows;
}

module.exports = {
    getAllCars,
    getAllCategories,
    getCar
}