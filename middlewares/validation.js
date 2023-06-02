const { body, validationResult } = require('express-validator');
const User = require('../models/user');

function validationObject(req, res, next){
  //Create an ErrorHandling Object in the format of 
  //{[param]:[msg]}
  //Where 'params' is the input name which failed 
  //validation and msg is the Error Message generated for it
  
  const errorObject = validationResult(req).formatWith(({msg})=>msg).mapped();
  if(Object.keys(errorObject).length>0) req.errorObject = errorObject;
  return next();
}

const isAuth = (req, res, next)=>{
  if(req.isAuthenticated()) return next();
  return res.redirect('/user/login');
};

const duplicateUserCheck = async (value)=>{
  const foundUser = await User.exists({username:value});
  if(foundUser) throw new Error('User Already Exists. Please Choose a new username');
  return true;
};

const confirmPassword = (value, { req })=> value === req.body.password;

const adminPasswordCheck = (value)=>{
  if(value !== process.env.ADMIN_CODE) throw new Error('Invalid Password');
  console.log('Illegal Access');
  return true;
}

const postValidation = [
  body('post', 'Post Cannot be Blank').trim().isLength({min:1}).escape(),
  validationObject,
];

const signUpValidation = [
  body('username', 'Username Cannot be Blank').trim().isLength({min:1}).escape().custom(duplicateUserCheck),
  body('firstName', 'First Name Cannot be Blank').trim().isLength({min:1}).escape(),
  body('lastName', 'Last Name Cannot be Blank').trim().isLength({min:1}).escape(),
  body('password', 'Password Cannot be Blank').trim().isLength({min:8}).escape(),
  body('passwordConfirm', 'Password Cannot be Blank').trim().isLength({min:8}).custom(confirmPassword).escape(),
  validationObject,
];

const loginValidation = [
  body('username', 'Username Cannot be Blank').trim().isLength({min:1}).escape(),
  body('password', 'Password Cannot be Blank').trim().isLength({min:8}).withMessage('Password too Short').escape(),
  validationObject,
];

const adminValidation = [
  body('password', 'Password Cannot be Blank').trim().isLength({min:8}).withMessage('Password too Short').escape().custom(adminPasswordCheck),
  validationObject,
];

module.exports = {
  isAuth,
  postValidation,
  signUpValidation,
  loginValidation,
  adminValidation,
};
