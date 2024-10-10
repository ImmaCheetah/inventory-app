require("dotenv").config();
const { Pool } = require("pg");

module.exports = new Pool({
    host: process.env.HOST, 
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.POOL_PORT 
});


// module.exports = new Pool({
//     connectionString: process.env.LOCAL_CONNECTION_STRING,
// });