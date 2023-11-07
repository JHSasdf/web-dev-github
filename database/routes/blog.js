const express = require('express');
const router = express.Router();

const db = require('../data/database');

router.get('/', function(req, res) {
    res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
    const [posts] = await db.query('SELECT * FROM posts');
    res.render('posts-list', {posts: posts})
});

router.get('/new-post', async function(req, res) { // mysql, 즉 db를 import할때 promise를 했기 때문에 async 사용가능.
    const [authors] = await db.query('SELECT * FROM authors'); // 배열로 반환하기 때문에 배열 비구조화 활용, 배열의 첫번째 요소 값을 가져옴 (author 테이블 자체).
    res.render('create-post', { authors: authors}); // authors: authors 테이블에 있는 배열
})

router.post('/posts',async function(req, res) {
    const data = [
        req.body.title,
        req.body.summary,
        req.body.content,
        req.body.author
    ];
    await db.query('INSERT INTO posts (title, summary, body, author_id) VALUES (?)', [data]); // ? 를 하나만 주면 두번째 parameter에서 전달하는 배열에서 제공하는 값으로 자동대체
    //db.query('INSERT INTO post (title, summary, body, author_id) VALUES (?, ?, ?, ?)', [data[0], data[1], data[2], data[3]])  이것도 가능
    res.redirect('/posts');
})
module.exports = router;