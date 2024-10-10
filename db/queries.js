const pool = require("./pool");

async function getAllCarModels() {
    const {rows} = await pool.query("SELECT * FROM cars");
    return rows;
}

module.exports = {
    getAllCarModels,
}