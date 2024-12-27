const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/auth');
const db = require('../config/database');
const path = require('path');

// Middleware to verify admin token
router.use(verifyToken);

// Admin dashboard
router.get('/dashboard', (req, res) => {
  db.query('SELECT * FROM products', (err, products) => {
    if (err) throw err;
    res.render('admin/dashboard', { products });
  });
});

// Add product
router.post('/products', (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.files ? req.files.image : null;

  if (image) {
    const fileName = Date.now() + path.extname(image.name);
    image.mv(path.join(__dirname, '../uploads/', fileName), (err) => {
      if (err) throw err;

      const product = { name, description, price, stock, image: fileName };
      db.query('INSERT INTO products SET ?', product, (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
      });
    });
  }
});

// Edit product
router.post('/products/:id', (req, res) => {
  const { name, description, price, stock } = req.body;
  const image = req.files ? req.files.image : null;
  
  if (image) {
    const fileName = Date.now() + path.extname(image.name);
    image.mv(path.join(__dirname, '../uploads/', fileName), (err) => {
      if (err) throw err;
      
      db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image = ? WHERE id = ?',
        [name, description, price, stock, fileName, req.params.id],
        (err) => {
          if (err) throw err;
          res.redirect('/admin/dashboard');
        }
      );
    });
  } else {
    db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
      [name, description, price, stock, req.params.id],
      (err) => {
        if (err) throw err;
        res.redirect('/admin/dashboard');
      }
    );
  }
});

// Delete product
router.post('/products/:id/delete', (req, res) => {
  db.query('DELETE FROM products WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/admin/dashboard');
  });
});

module.exports = router;