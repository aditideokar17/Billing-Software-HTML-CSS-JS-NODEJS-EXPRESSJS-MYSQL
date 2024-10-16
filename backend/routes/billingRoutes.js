// backend/routes/billingRoutes.js

const express = require('express');
const router = express.Router();
const Billing = require('../models/BillingModel');

// Add billing
router.post('/', (req, res) => {
    Billing.create(req.body, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Billing added successfully', billingId: result.insertId });
    });
});



// Get all billing entries
router.get('/', (req, res) => {
    Billing.findAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
