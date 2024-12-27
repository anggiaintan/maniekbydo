const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Route untuk menampilkan semua produk
router.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, products) => {
        if (err) {
            console.error(err);
            return res.render('error', { error: err });
        }
        res.render('product', { products: products });
    });
});

// Route untuk menampilkan detail produk
router.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
        if (err) {
            console.error(err);
            return res.render('error', { error: err });
        }
        if (results.length === 0) {
            return res.render('error', { error: { message: 'Product not found' } });
        }
        res.render('product', { product: results[0] });
    });
});

module.exports = router;