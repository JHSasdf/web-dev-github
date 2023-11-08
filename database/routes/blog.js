const express = require("express");
const router = express.Router();

const db = require("../data/database");

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `SELECT posts.*, authors.name AS author_name FROM posts
    INNER JOIN authors ON posts.author_id = authors.id`;
  const [posts] = await db.query(query); // query는 배열을 가져오는데 첫번째 항목은 쿼리의 결과, 두번째 결과는 메타데이터
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  // mysql, 즉 db를 import할때 promise를 했기 때문에 async 사용가능.
  const [authors] = await db.query("SELECT * FROM authors"); // 배열로 반환하기 때문에 배열 비구조화 활용, 배열의 첫번째 요소 값을 가져옴 (author 테이블 자체).
  res.render("create-post", { authors: authors }); // authors: authors 테이블에 있는 배열
});

router.post("/posts", async function (req, res) {
  const data = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "INSERT INTO posts (title, summary, body, author_id) VALUES (?)",
    [data]
  ); // ? 를 하나만 주면 두번째 parameter에서 전달하는 배열에서 제공하는 값으로 자동대체
  //db.query('INSERT INTO post (title, summary, body, author_id) VALUES (?, ?, ?, ?)', [data[0], data[1], data[2], data[3]])  이것도 가능
  res.redirect("/posts");
});

router.get("/posts/:id", async function (req, res) {
  const query = `SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
     INNER JOIN authors ON posts.author_id = authors.id WHERE posts.id = ?`;
  const [posts] = await db.query(query, [req.params.id]); // query의 2번째 인자에는 윗줄 ?에 들어갈 값을 넣음

  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }

  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(), // 기계가 이해할 수 있게 만드는 method
    // 데이터베이스에 저장된 날짜 정보는 mysql패키지에 의해 자바스크립트 객체로 변환됨. 그래서 이를 바탕으로 toISOString 메소드를 사용할 수 있음.
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    // 사람이 읽을 수 있는 문자열로 바꿔주는 method
  };
  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
    SELECT * from posts WHERE id = ?`;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:id/edit", async function (req, res) {
  const query = `
    UPDATE posts SET title = ?, summary = ?, body = ?
    WHERE id = ?`;
  await db.query(
    query,
    [req.body.title, req.body.summary, req.body.content, req.params.id,]
    );
  res.redirect('/posts');
});

router.post("/posts/:id/delete", async function(req, res) {
    await db.query('DELETE FROM posts WHERE id = ?', [req.params.id]);
    res.redirect('/posts');
});

module.exports = router;
