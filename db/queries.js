const pool = require("./pool");

async function getAllCars() {
    const {rows} = await pool.query("SELECT * FROM cars ORDER BY brand ASC");
    return rows;
}

async function getAllCarsInCategory(categoryId) {
    const {rows} = await pool.query(
        `SELECT brand, model, category FROM cars
        JOIN car_categories
        ON cars.car_id = car_categories.car_id
        JOIN categories
        ON car_categories.category_id = categories.category_id
        WHERE categories.category_id = ($1)`, [categoryId]);
    return rows;
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories");
    return rows;
}

async function getCar(id) {
    const {rows} = await pool.query("SELECT * FROM cars WHERE cars.car_id = ($1)", [id]);
    return rows;
}

async function insertCar(brand, model, description, category) {
    const carId = await pool.query(`INSERT INTO cars (brand, model, description) VALUES ($1, $2, $3) RETURNING car_id`, [brand, model, description])
    console.log(carId.rows[0].car_id)

    const categoryId = await pool.query(`SELECT category_id FROM categories WHERE category = ($1)`, [category])
    console.log(categoryId)

    await pool.query(`INSERT INTO car_categories (car_id, category_id) VALUES ($1, $2)`, [carId.rows[0].car_id, categoryId.rows[0].category_id]);
}

async function insertCategory(category) {
    await pool.query(`INSERT INTO categories (category) VALUES ($1)`, [category])
}

async function findCategory(categoryId) {
    const {rows} = await pool.query("SELECT * FROM categories WHERE category_id = ($1)", [categoryId]);
    return rows;
}

async function findCar(carId) {
    const {rows} = await pool.query("SELECT * FROM cars WHERE car_id = ($1)", [carId]);
    return rows;
}

async function updateCategory(category, categoryId) {
    await pool.query(`UPDATE categories SET category = ($1) WHERE category_id = ($2)`, [category, categoryId])
}

async function updateCar(brand, model, description, carId) {
    await pool.query(`UPDATE cars SET brand = ($1), model = ($2), description = ($3) WHERE car_id = ($4)`, [brand, model, description, carId])
}

module.exports = {
    getAllCars,
    getAllCarsInCategory,
    getAllCategories,
    getCar,
    insertCar,
    insertCategory,
    findCategory,
    findCar,
    updateCategory,
    updateCar
}