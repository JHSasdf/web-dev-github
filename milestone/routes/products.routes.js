const express = require('express');
const controller = require('../controllers/products.controller');

const router = express();

router.get('/products', controller.getAllProducts);

router.get('/products/:id', controller.getProductDetails);

module.exports = router;