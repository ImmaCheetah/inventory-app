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

async function insertCar(brand, model, description, category) {
    /*
    - insert a car into cars table
    - search for selected category id
    - insert into junction using returning id from cars table and category id
    */
    const carId = await pool.query(`INSERT INTO cars (brand, model, description) VALUES ($1, $2, $3) RETURNING car_id`, [brand, model, description])
    console.log(carId.rows[0].car_id)

    const categoryId = await pool.query(`SELECT category_id FROM categories WHERE category = ($1)`, [category])
    console.log(categoryId)

    await pool.query(`INSERT INTO car_categories (car_id, category_id) VALUES ($1, $2)`, [carId.rows[0].car_id, categoryId.rows[0].category_id]);
}

async function insertCategory(category) {
    await pool.query(`INSERT INTO categories (category) VALUES ($1)`, [category])
}

module.exports = {
    getAllCars,
    getAllCategories,
    getCar,
    insertCar,
    insertCategory
}