const express = require('express');
const ordersController = require('../controllers/orders.controller');
const router = express();

router.get('/', ordersController.getOrders);

router.post('/', ordersController.addOrder);

router.get('/success', ordersController.getSuccess);

router.get('/failure', ordersController.getFailure);


module.exports = router;