const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'portal',
    password: 'portal@8008',
    database: 'portal',
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