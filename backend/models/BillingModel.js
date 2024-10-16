// backend/models/BillingModel.js

const db = require('../config/db');

const Billing = {
    create: (data, callback) => {
        const query = 'INSERT INTO billing (customerId, productId, totalAmount) VALUES (?, ?, ?)';
        db.query(query, [data.customerId, data.productId, data.totalAmount], callback);
    },
    findAll: (callback) => {
        db.query('SELECT * FROM billing', callback);
    }
};

module.exports = Billing;
