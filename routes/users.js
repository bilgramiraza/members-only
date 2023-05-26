const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { signUpValidation } = require('../middlewares/validation');

//USER ROUTES //
/*User Sign up Route*/
router.get('/sign-up', userController.signUpGet);
router.post('/sign-up', signUpValidation, userController.signUpPost);

/*User Login Route*/
router.get('/login', userController.signUpGet);
router.post('/login', userController.signUpPost);

module.exports = router;
