const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.index = async (req, res, next) => {
  try{
    const posts = await Post.find({}).select('post time user').lean().sort({time:-1}).exec();
    return res.render('index',{
      posts
    });
  }catch(err){
    return next(err);
  }
};

exports.postCreateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Create GET');
};

exports.postCreatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Create POST');
};

exports.postDeleteGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Delete GET');
};

exports.postDeletePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Delete POST');
};

exports.postUpdateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Update GET');
};

exports.postUpdatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Update POST');
};
