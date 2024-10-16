// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');

// Add product
router.post('/', (req, res) => {
    Product.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});

// Get all products
router.get('/', (req, res) => {
    Product.findAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
