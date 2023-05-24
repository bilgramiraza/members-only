const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//USER ROUTES //
/*User Sign up Route*/
router.get('/sign-up', userController.signUpGet);
router.post('/sign-up', userController.signUpPost);

/*User Login Route*/
router.get('/login', userController.signUpGet);
router.post('/login', userController.signUpPost);

module.exports = router;
