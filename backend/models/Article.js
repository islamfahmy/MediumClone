const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likeList: [{ username: String, userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  comments: [{ body: String, username: String, userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
  readers: { type: Number, default: 0 },
  tags: [{ type: String }],
  time: { type: Date, default: new Date() }

});

module.exports = mongoose.model('Article', schema);
