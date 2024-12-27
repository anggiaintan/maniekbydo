const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Route untuk halaman utama/dashboard customer
router.get('/dashboard', (req, res) => {
    db.query('SELECT * FROM products', (err, products) => {
        if (err) {
            console.error(err);
            return res.render('error', { 
                error: err, 
                layout: false // Hindari layout untuk error
            });
        }
        res.render('dashboard', { 
            products: products,
            layout: 'layouts/main-layout' // Tambahkan ini
        });
    });
});

module.exports = router;