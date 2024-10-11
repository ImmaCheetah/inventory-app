const pool = require("./pool");

async function getAllCars() {
    const {rows} = await pool.query("SELECT * FROM cars");
    return rows;
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT category FROM categories");
    return rows;
}

module.exports = {
    getAllCars,
    getAllCategories
}