const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const verifyCallback = async (username, password, done)=>{
  try{
  }catch(err){
    return done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser(async (userId, done)=>{
  try{
  }catch(err){
    return done(err);
  }
});
