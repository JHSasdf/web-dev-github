const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
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
    console.log("Incorrect data!");
    return res.redirect("/signup");
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    console.log("User exists already");
    return res.redirect("/signup");
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
    console.log("Could not log in!");
    return res.redirect("/login");
  }
  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  ); // 같으면 true  반환

  if (!passwordsAreEqual) {
    console.log("Could not log in - passwords are not equal!");
    return res.redirect("/login");
  }

  console.log("User is authenticated!");
  res.redirect("/admin");
});

router.get("/admin", function (req, res) {
  // Check the user "ticket"
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
