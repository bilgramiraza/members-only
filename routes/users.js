const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { signUpValidation, loginValidation ,isAuth ,adminValidation} = require('../middlewares/validation');

//USER ROUTES //
//User Sign up Route
router.get('/sign-up', userController.signUpGet);
router.post('/sign-up', signUpValidation, userController.signUpPost);

//User Login Route
router.get('/login', userController.loginGet);
router.post('/login', loginValidation, userController.loginPost);

//Account Level Escalation Route
router.get('/admin', isAuth, userController.adminGet);
router.post('/admin', isAuth, adminValidation, userController.adminPost);

//User Logout Route
router.get('/logout', userController.logout);

module.exports = router;
