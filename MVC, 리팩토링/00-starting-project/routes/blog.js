const express = require('express');

const Post = require('../models/post');
const blogControllers = require('../controllers/post-controllers');
const guardRoute = require('../middlewares/auth-protection-middleware');
const router = express.Router();

router.get('/', blogControllers.getHome);

router.use(guardRoute);
// 10행 이후의 모든 router가 이 미들웨어에 의해 보호

router.get('/admin', blogControllers.getAdmin);

router.post('/posts', blogControllers.createPost);

router.get('/posts/:id/edit', blogControllers.getSinglePost);

router.post('/posts/:id/edit', blogControllers.updatePost);

router.post('/posts/:id/delete', blogControllers.deletePost);

module.exports = router;
