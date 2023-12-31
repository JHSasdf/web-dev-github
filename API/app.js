const express = require('express');

const db = require('./data/database');
const quoteRouter = require('./routes/quote.routes');

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/quote', quoteRouter);

app.use(function(error, req, res, next) {
    res.status(500).json({
        message: 'Something went wrong!'
    })
})


db.initDb().then(function() {
    app.listen(3000);
}).catch(function(error) {
    console.log('Connecting to the database failed!');
});