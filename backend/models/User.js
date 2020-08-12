/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, require: true },
  following: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  history: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Article' }],
  savedArticles: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Article' }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  perferences: [{ type: String }]

});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
