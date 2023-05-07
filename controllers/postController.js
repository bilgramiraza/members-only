const post = require('../models/post');
const { body, validationResult } = require('express-validator');

//Only have to implement this function once per project
exports.index = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.postList = (req, res, next) => {
  res.send('NOT IMPLEMENTED: post List');
};

exports.postDetail = (req, res, next) => {
  res.send(`NOT IMPLEMENTED: post Detail ${req.params.id}`);
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
