const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 1000,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

module.exports = pool.promise();