const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

const { postValidation } = require('../middlewares/validation');

//POSTS ROUTES //
//Website HomePage | List All posts
router.get('/', postController.index);

//Post Creation Page
router.get('/post/create', postController.postCreateGet);
router.post('/post/create', postValidation, postController.postCreatePost);

//Post Deletion Page
router.get('/post/:id/delete', postController.postDeleteGet);
router.post('/post/:id/delete', postController.postDeletePost);

//Post Update Page
router.get('/post/:id/update', postController.postUpdateGet);
router.post('/post/:id/update', postValidation, postController.postUpdatePost);

module.exports = router;
