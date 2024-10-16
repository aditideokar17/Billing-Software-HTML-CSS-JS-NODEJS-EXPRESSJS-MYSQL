// backend/models/CustomerModel.js

const db = require('../config/db');

const Customer = {
    create: (data, callback) => {
        const query = 'INSERT INTO customers (name, gender, contact, email) VALUES (?, ?, ?, ?)';
        db.query(query, [data.name, data.gender, data.contact, data.email], callback);
    },
    findAll: (callback) => {
        db.query('SELECT * FROM customers', callback);
    }
};

module.exports = Customer;
