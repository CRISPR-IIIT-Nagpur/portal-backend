const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Get a promise-based interface to the pool
const promisePool = pool.promise();

// Test the connection
pool.getConnection((err, connection) => {
    if (err) {
        console.log('Error connecting to database:', err);
        return;
    }
    console.log('Database connection established');
    connection.release();
});

module.exports = {
    pool: pool,
    promisePool: promisePool
};