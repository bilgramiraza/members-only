const Post = require('../models/post');

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

exports.postUpdateGet = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id).lean().exec();
    if(!post){
      const err = new Error('Post Not Found');
      err.status = 404;
      return next(err);
    }

    return res.render('postForm',{
      type:'Update',
      ...post,
    });
  }catch(err){
    return next(err);
  }
};

exports.postUpdatePost = async (req, res, next) => {
  const {newPost} = req.body;
  if(!req.errorObject){
    return res.render('postForm',{
      type:'Update',
      post:newPost,
      errors:req.errorObject,
    });
  }
  try{
    await Post.findOneAndUpdate(req.params.id,{newPost},{new:true, lean:true});

    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};
