// backend/models/ProductModel.js

const db = require('../config/db');

const Product = {
    create: (data, callback) => {
        const query = 'INSERT INTO products (productName, price, quantity, brand, supplier, oldStock, category) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [data.productName, data.price, data.quantity, data.brand, data.supplier, data.oldStock, data.category], callback);
    },
    findAll: (callback) => {
        db.query('SELECT * FROM products', callback);
    }
};

module.exports = Product;
