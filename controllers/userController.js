const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

const signUpGet= (req, res)=>{
  if(req.isAuthenticated()) return res.redirect('/');
  return res.render('signUp',{
    currentUser:req?.user?.firstName,
  });
};

const signUpPost= async (req, res, next)=>{
  const {username, firstName, lastName, password} = req.body;
  if(req.errorObject){
    return res.render('signUp',{
      currentUser:req?.user?.firstName,
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
    return res.redirect('/user/login');
  }catch(err){
    return next(err);
  }
};

const loginGet= (req, res)=>{
  if(req.isAuthenticated()) return res.redirect('/');
  return res.render('login',{
    currentUser:req?.user?.firstName,
  });  
};

const loginPost= (req, res, next)=>{
  const { username } = req.body;
  if(req.errorObject){
    return res.render('login',{
      currentUser:req?.user?.firstName,
      username,
      errors:req.errorObject,
    });
  }

  passport.authenticate('local', (err, user, info)=>{
    if(err) return next(err);
    if(!user){
      res.render('login',{
        currentUser:req?.user?.firstName,
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

const logout = (req, res)=>{
  req.logout(function (err){
    if(err) return next(err);
    return res.redirect('/');
  });
};

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  logout,
};
