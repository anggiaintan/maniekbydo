const express = require('express');
const router = express.Router();

// Halaman login
router.get('/login', (req, res) => {
    res.render('login', { layout: false });
});

// Proses login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'rahasiadong') {
        res.redirect('/admin/dashboard');
    } else {
        res.render('login', { 
            layout: false, 
            error: 'Username atau password salah!' 
        });
    }
});

module.exports = router;