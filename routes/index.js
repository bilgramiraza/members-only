const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

const { postValidation, isAuth, isAdmin} = require('../middlewares/validation');

//POSTS ROUTES //
//Website HomePage | List All posts
router.get('/', postController.index);

//Post Creation Page
router.get('/post/create', isAuth, postController.postCreateGet);
router.post('/post/create', isAuth, postValidation, postController.postCreatePost);

//Post Deletion Page
router.get('/post/:id/delete', isAdmin, postController.postDeleteGet);
router.post('/post/:id/delete', isAdmin, postController.postDeletePost);

//Post Update Page
router.get('/post/:id/update', isAdmin, postController.postUpdateGet);
router.post('/post/:id/update', isAdmin, postValidation, postController.postUpdatePost);

module.exports = router;
