const pool = require("./pool");

async function getAllCars() {
    const {rows} = await pool.query("SELECT * FROM cars ORDER BY brand ASC");
    return rows;
}

async function getAllCarsInCategory(categoryId) {
    const {rows} = await pool.query(
        `SELECT cars.car_id, brand, model, category FROM cars
        JOIN car_categories
        ON cars.car_id = car_categories.car_id
        JOIN categories
        ON car_categories.category_id = categories.category_id
        WHERE categories.category_id = ($1)`, [categoryId]);
    return rows;
}

async function getAllCategories() {
    const {rows} = await pool.query("SELECT * FROM categories ORDER BY category ASC");
    return rows;
}

async function getCar(id) {
    try {
        const {rows} = await pool.query("SELECT * FROM cars WHERE cars.car_id = ($1)", [id]);
        return rows;
    } catch (error) {
        next(new Error("Failed get car query"))
    }
}

async function insertCar(brand, model, description, category) {
    try {
        const carId = await pool.query(`INSERT INTO cars (brand, model, description) VALUES ($1, $2, $3) RETURNING car_id`, [brand, model, description])
        console.log(carId.rows[0].car_id)
    
        const categoryId = await pool.query(`SELECT category_id FROM categories WHERE category = ($1)`, [category])
        console.log(categoryId)
    
        await pool.query(`INSERT INTO car_categories (car_id, category_id) VALUES ($1, $2)`, [carId.rows[0].car_id, categoryId.rows[0].category_id]);
    } catch (error) {
        next(new Error("Failed insert car query"))
    }
}

async function insertCategory(category) {
    try {
        await pool.query(`INSERT INTO categories (category) VALUES ($1)`, [category])
    } catch (error) {
        next(new Error("Failed insert category query"))
    }
}

async function findCategory(categoryId) {
    try {
        const {rows} = await pool.query("SELECT * FROM categories WHERE category_id = ($1)", [categoryId]);
        return rows;
    } catch (error) {
        next(new Error("Failed find category query"))
    }
}

async function findCar(carId) {
    try {
        const {rows} = await pool.query("SELECT * FROM cars WHERE car_id = ($1)", [carId]);
        return rows;
    } catch (error) {
        next(new Error("Failed find car query"))
    }
}

async function updateCategory(category, categoryId) {
    try {
        await pool.query(`UPDATE categories SET category = ($1) WHERE category_id = ($2)`, [category, categoryId])
    } catch (error) {
        next(new Error("Failed update category query"))
    }
}

async function updateCar(brand, model, description, carId) {
    try {
        await pool.query(`UPDATE cars SET brand = ($1), model = ($2), description = ($3) WHERE car_id = ($4)`, [brand, model, description, carId])
    } catch (error) {
        next(new Error("Failed update car query"))
    }
}

async function deleteCar(carId) {
    try {
        await pool.query(`DELETE FROM cars WHERE car_id = ($1)`, [carId]) 
    } catch (error) {
        next(new Error("Failed delete car query"))
    }
}

async function deleteCategory(categoryId) {
    try {
        await pool.query('BEGIN')

        await pool.query(
        `DELETE FROM cars USING car_categories
        WHERE cars.car_id = car_categories.car_id 
        AND car_categories.category_id = $1;`, [categoryId])

        await pool.query(`DELETE FROM categories
        WHERE category_id = $1;`, [categoryId])

        await pool.query('COMMIT')
    } catch (error) {
        next(new Error("Failed delete category query"))
    }
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
    updateCar,
    deleteCar,
    deleteCategory
}