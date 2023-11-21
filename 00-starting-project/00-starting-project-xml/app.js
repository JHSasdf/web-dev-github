const path = require('path');

const express = require('express');

const blogRoutes = require('./routes/blog');
const db = require('./data/database');

const app = express();

// Activate EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies, 메타데이터에 urlencoded라고 표시되면 이 미들웨어 활성화
app.use(express.static('public')); // Serve static files (e.g. CSS files)
app.use(express.json()); // 들어오는 모든 요청을 구문 분석하고 제이슨 형식인지 확인, 메타데이터에 제이슨으로 인코딩되어있다고 표시되면 이 미들웨어 활성화

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render('500');
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
