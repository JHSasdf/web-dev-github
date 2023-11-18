const express = require("express");

const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDb()
    .collection("posts")
    .find({}, { title: 1, summary: 1, "author.name": 1 })
    .toArray();
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  let authorId;
  try {
    authorId = new ObjectId(req.body.author);
  } catch(error) {
    return res.status(404).render('404');
  }

  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  // console.log(result);
  res.redirect("/posts");
});

router.get("/post/:id", async function (req, res, next) {
  let postId = req.params.id;

  try {
    postId = new ObjectId(postId)
  } catch (error) {
    return res.status(404).render("404");
    // return next(error);
  }

  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: postId }, { summary: 0 });

    // new ObjectId(postId)에서 오류가 생겨서 61 line까지 도달하지 못함
  if (!post) {
    return res.status(404).render("404");
  }

  post.humanReadableDate = post.date.toLocaleDateString("ko-KR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  post.date = post.date.toISOString();

  res.render("post-detail", { post: post });
});

router.get("/post/:id/edit", async function (req, res) {
  let postId = req.params.id;

  try {
    postId = new ObjectId(postId)
  } catch(error) {
    return res.status(404).render('404');
  }

  const post = await db
    .getDb()
    .collection("posts")
    .findOne({ _id: postId }, { title: 1, summary: 1, body: 1 });
  if (!post) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: post });
});

router.post("/post/:id/edit", async function (req, res) {
  const postId = req.params.id;
  const result = await db
    .getDb()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
          // date: new Date(),
        },
      }
    );

  res.redirect("/posts");
});

router.post("/post/:id/delete", async function (req, res) {
  await db
    .getDb()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  res.redirect("/posts");
});

module.exports = router;
