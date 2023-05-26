const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

const verifyCallback = async (username, password, done)=>{
  try{
    const foundUser = await User.findOne({username}).lean();
    if(!foundUser) return done(null, false, {field:'username' ,msg:'User not found'});

    const passwordCompare = await bcrypt.compare(password, foundUser.password);
    if(!passwordCompare)  return done(null, false, {field:'password', msg:'Invalid Password'});

    return done(null, foundUser);
  }catch(err){
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser(function(user, done){
  done(null, user._id);
});

passport.deserializeUser(async function (userId, done){
  try{
    const user = await User.findById(userId).lean();
    return done(null, user);
  }catch(err){
    return done(err);
  }
});
