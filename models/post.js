const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  post: { type:String, required: true },
  time: { type:Date, default:Date.now() },
  user: { type:Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('post', postSchema);
