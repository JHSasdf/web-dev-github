const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: ''
    };
  }
  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData});
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      password: ''
    };
  }
  req.session.inputData = null;
  res.render("login", { inputData: sessionInputData});
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"]; // 허용되지 않는 문자가 포함된 속성을 부르는 경우 이 표기법을 이용함. 점 표기법과 동일
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword
    };
    req.session.save(function() {
      res.redirect("/signup");
    });
    return;
      //return res.render('signup');
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {

    req.session.inputData = {
      hasError: true,
      message: 'User exists already!',
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword
    };
    req.session.save(function() {
      res.redirect("/signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email: enteredEmail,
      password: enteredPassword
    };
    req.session.save(function() {
      res.redirect("/login", {});
    })
    return;
  }
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  ); // 같으면 true  반환

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log you in - please check your credentials!',
      email: enteredEmail,
      password: enteredPassword
    };
    req.session.save(function() {
      res.redirect("/login");
    });
    return;
  }


  console.log("User is authenticated!");

  req.session.user = { id: existingUser._id, email: existingUser.email }; // 64번째줄에서 데이터베이스에서 가져온 정보가 세션 컬렉션에 저장
  req.session.isAuthenticated = true;
  // 이 세션에 연결된 요청이 인증된 요청임을 알려주는 것
  req.session.save(function() {
    res.redirect("/profile");
  });

});

router.get("/admin", async function (req, res) {
  // Check the user "ticket"
  if (!res.locals.isAuth) { // if (!req.session.user)
    return res.status(401).render('401'); 
  }

  // const user = await db.getDb().collection('users').findOne({_id: req.session.user.id});

  if (!res.locals.isAdmin) {
    return res.status(403).render('403');
  }
  res.render("admin");
});

router.get("/profile", function (req, res) {
  // Check the user "ticket"
  if (!res.locals.isAuth) { // if (!req.session.user)
    return res.status(401).render('401'); 
  }

  res.render("profile");
});


router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

module.exports = router;
