const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'auth-demo',
  collection: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); // url 말고 다른 것은 parsing하지 않겠다!!!

app.use(session({
  secret: 'super-secret',
  resave: false, // 세션의 데이터가 실제로 변경된 경우에만 데이터베이스에서 업데이트되는 데 영향,
  //  true면 세션데이터가 변경안되었을때도 들어오는 모든 요청에 대해 새 세션이 데이터베이스에 저장
  saveUninitialized: false, // 세션이 데이터베이스나 우리가 원하는 곳에만 저장되게 함 , 내부에 데이터가 없는 빈 세션은 데이터베이스에 저장되지 않으므로 세션쿠키가 없음.
  store: sessionStore,    // 세션 데이터가 저장되어야 하는 위치 지정
  cookie: {
    // maxAge: 30 * 24 * 60 * 60 * 1000 // 설정안하면 만료안됨 대신 세션이 닫히면 삭제. 대신 maxAge를 설정하면 세션이 닫혀도 만료가 안됨.
  }

}));

app.use(async function(req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;
 

  if(!user || !isAuth) {
    return next(); // 밑을 수행하지 않고 다음 미들웨어로 이동
  }
  const userDoc = await db.getDb().collection('users').findOne({_id: user.id});
  const isAdmin = userDoc.isAdmin;

  res.locals.isAuth = isAuth;
  res.locals.isAdmin = isAdmin;
  next()
})

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
