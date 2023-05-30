const Post = require('../models/post');

const index = async (req, res, next) => {
  try{
    const posts = await Post.find({}).select('post time user modified').lean().sort({time:-1}).exec();
    return res.render('index',{
      posts,
      currentUser:req?.user?.firstName,
    });
  }catch(err){
    return next(err);
  }
};

const postCreateGet = (req, res, next) => {
  res.render('postForm',{
    type:'Creation',
    currentUser:req?.user?.firstName,
  });
};

const postCreatePost = async(req, res, next) => {
  const {post} = req.body;
  if(req.errorObject){
    return res.render('postForm',{
      type:'Creation',
      currentUser:req?.user?.firstName,
      post,
      errors:req.errorObject,
    });
  }
  const postObject = new Post({
    post,
    user:req.user._id,
  });
  try{
    await postObject.save();
    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};

const postDeleteGet = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id).select('post time user modified').lean().exec();
    if(!post) return res.redirect('/');

    return res.render('postDelete',{
      ...post,
      currentUser:req?.user?.firstName,
    });
  }catch(err){
    return next(err);
  }
};

const postDeletePost = async(req, res, next) => {
  try{
    const post = await Post.findById(req.body.postId).lean().exec();
    if(!post) return res.redirect('/');

    await Post.findByIdAndDelete(req.body.postId);
    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};

const postUpdateGet = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id).lean().exec();
    if(!post){
      const err = new Error('Post Not Found');
      err.status = 404;
      return next(err);
    }

    return res.render('postForm',{
      type:'Update',
      currentUser:req?.user?.firstName,
      ...post,
    });
  }catch(err){
    return next(err);
  }
};

const postUpdatePost = async (req, res, next) => {
  const {post} = req.body;
  if(req.errorObject){
    return res.render('postForm',{
      type:'Update',
      currentUser:req?.user?.firstName,
      post,
      errors:req.errorObject,
    });
  }
  try{
    const postObject = {
      post,
      time:Date.now(),
      modified:true,
    };
    await Post.findByIdAndUpdate(req.params.id, postObject, {new:true, lean:true});
     
    return res.redirect('/');
  }catch(err){
    return next(err);
  }
};

module.exports = {
  index,
  postCreateGet,
  postCreatePost,
  postDeleteGet,
  postDeletePost,
  postUpdateGet,
  postUpdatePost,
};
