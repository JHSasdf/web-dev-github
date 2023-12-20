const express = require('express');
const router = express();
const controller = require('../controllers/quote.controller')

router.get('/', controller.getRandomQuote);

module.exports = router;