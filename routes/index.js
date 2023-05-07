const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

//POSTS ROUTES //
//Website HomePage
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Post Creation Page
router.get('/post/create', postController.postCreateGet);
router.post('/post/create', postController.postCreatePost);

//Post Deletion Page
router.get('/post/:id/delete', postController.postDeleteGet);
router.post('/post/:id/delete', postController.postDeletePost);

//Post Update Page
router.get('/post/:id/update', postController.postUpdateGet);
router.post('/post/:id/update', postController.postUpdatePost);

//Post Details Page
router.get('/post/:id', postController.postDetail);

//List All posts
router.get('/posts', postController.postList);

module.exports = router;
