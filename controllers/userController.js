const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signUpGet= (req, res, next) => {
  return res.render('signUp');
};

exports.signUpPost= async (req, res, next) => {
  const {username, firstName, lastName, password} = req.body;
  if(req.errorObject){
    return res.render('signUp',{
      username,
      firstName,
      lastName,
      password,
      errors:req.errorObject,
    });
  }
  try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const user = new User({
      username,
      password:hashedPassword,
      firstName,
      lastName,
    });
    await user.save();
    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};

exports.loginGet= (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login Get Page');
};

exports.loginPost= (req, res, next) => {
  res.send('NOT IMPLEMENTED: Login Post Page');
};
