const path = require('path');

const express = require('express');
const session = require('express-session');

const csrf = require('csurf');

const sessionConfig = require('./config/session');
const db = require('./data/database');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const authMiddleware = require('./middlewares/auth-middleware');
const addCSRFTokenMiddleware = require('./middlewares/csrf-middleware');


const mongoDbSessionStore = sessionConfig.createSessionStore(session);

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));
app.use(csrf());


app.use(addCSRFTokenMiddleware);
// 직접 실행하지 않고 express로 등록하는 미들웨어함수, 요청을 받으면 express가 알아서 실행한다.
app.use(authMiddleware);

app.use(authRoutes);
app.use(blogRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
