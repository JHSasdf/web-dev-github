const express = require('express');
const router = express();

router.get('/', function(req, res) {
    res.redirect('/products');
});

module.exports = router;