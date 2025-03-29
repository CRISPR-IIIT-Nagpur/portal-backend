const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db due to ' + err);
        return;
    }
    console.log('Connection established');
}
);

module.exports = connection;