require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// Routes
app.get('/', (req, res) => {
    res.render('choose-role', { layout: false });
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboard');
const productRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');

// Use routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);
app.use('/', productRoutes);
app.use('/admin', adminRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        error: { message: err.message || 'Something went wrong!' },
        layout: false // Render error page without layout
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { 
        error: { message: 'Page not found' },
        layout: false // Render error page without layout
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;