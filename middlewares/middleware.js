const express = require('express');
const layouts = require('express-ejs-layouts');

const setupMiddleware = (app) => {
    // Setup EJS Layout
    app.use(layouts);
    app.set('layout', 'layouts/main-layout');
    
    // Setup static folder
    app.use(express.static('public'));
    app.use('/uploads', express.static('uploads'));
    
    // Parse JSON and URL-encoded bodies
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

module.exports = setupMiddleware;