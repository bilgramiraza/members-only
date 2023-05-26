const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

const { postValidation, isAuth } = require('../middlewares/validation');

//POSTS ROUTES //
//Website HomePage | List All posts
router.get('/', postController.index);

//Post Creation Page
router.get('/post/create', isAuth, postController.postCreateGet);
router.post('/post/create', isAuth, postValidation, postController.postCreatePost);

//Post Deletion Page
router.get('/post/:id/delete', isAuth, postController.postDeleteGet);
router.post('/post/:id/delete', isAuth, postController.postDeletePost);

//Post Update Page
router.get('/post/:id/update', isAuth, postController.postUpdateGet);
router.post('/post/:id/update', isAuth, postValidation, postController.postUpdatePost);

module.exports = router;
