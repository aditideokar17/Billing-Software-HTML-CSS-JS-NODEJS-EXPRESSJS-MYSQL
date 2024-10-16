// backend/routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const Customer = require('../models/CustomerModel');

// Add customer
router.post('/', (req, res) => {
    Customer.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Customer added successfully', customerId: result.insertId });
    });
});

// Get all customers
router.get('/', (req, res) => {
    Customer.findAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
