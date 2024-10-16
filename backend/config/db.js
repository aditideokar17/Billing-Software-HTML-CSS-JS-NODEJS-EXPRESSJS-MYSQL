// backend/config/db.js

const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',     // Your database host (e.g., localhost)
    user: 'root', // Your database username
    password: 'root', // Your database password
    database: 'billing_software' // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;
