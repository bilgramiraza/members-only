const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

exports.loginGet= (req, res) => {
  if(req.isAuthenticated()) return res.redirect('/');
  return res.render('login');  
};

exports.loginPost= (req, res, next)=>{
  const { username } = req.body;
  if(req.errorObject){
    return res.render('login',{
      username,
      errors:req.errorObject,
    });
  }

  passport.authenticate('local', (err, user, info)=>{
    if(err) return next(err);
    if(!user){
      res.render('login',{
        username,
        errors:{
         [info.field]:info.msg, 
        }, 
      });
    }
    req.login(user, function(err){
      if(err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = (req, res)=>{
  req.logout(function (err){
    if(err) return next(err);
    return res.redirect('/');
  });
};
