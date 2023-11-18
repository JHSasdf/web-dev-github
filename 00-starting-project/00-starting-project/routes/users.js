const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images'); //
  },
  filename: function(req, file, cb) {
    cb(null,  Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storageConfig });
const router = express.Router();

router.get('/', async function(req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', {users, users });
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function(req, res) { // image는 profiles 경로에 post되는 name:'image'인  input
  const uploadedImageFile = req.file; // 파일 경로같은 추가 파일 정보를 제공하는 객체
  const userData = req.body; 

  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,

  });
  res.redirect('/');
});
module.exports = router;