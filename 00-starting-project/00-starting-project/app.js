const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));  // static을 쓰면 그 폴더 아래에서 경로를 설정해야함.
app.use('/images', express.static('images')); // 첫번째에 /images처럼 필터를 추가하면 필터링할 경로 /images는 오는 경로에서 삭제됨. 그래서 /images를 넣어도 됨.
// 이 미들웨어는 /images로 시작하는 경로를 가진 요청이 들어올 때만 활성화됨

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
