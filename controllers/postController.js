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
  res.render('postForm',{type:'Creation'});
};

exports.postCreatePost = async(req, res, next) => {
  const {post} = req.body;
  if(req.errorObject){
    return res.render('postForm',{
      type:'Creation',
      post,
      errors:req.errorObject,
    });
  }
  const postObject = new Post({
    post,
    user:'6461c81664053c0a7bac2106',
  });
  try{
    await postObject.save();
    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};

exports.postDeleteGet = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id).select('post time user').lean().exec();
    if(!post) return res.redirect('/');

    return res.render('postDelete',{
      ...post
    });
  }catch(err){
    return next(err);
  }
};

exports.postDeletePost = async(req, res, next) => {
  try{
    const post = await Post.findById(req.body.postId).lean().exec();
    if(!post) return res.redirect('/');

    await Post.findOneAndDelete(req.body.postId);
    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};

exports.postUpdateGet = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Update GET');
};

exports.postUpdatePost = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post Update POST');
};
