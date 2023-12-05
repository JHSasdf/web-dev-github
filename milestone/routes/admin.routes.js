const express = require('express');

const adminController = require('../controllers/admin.controller');
const router = express();

router.get('/products', adminController.getProducts);

router.get('/products/new', adminController.getNewProduct);

module.exports = router;