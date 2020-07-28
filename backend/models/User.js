/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, require: true },
  following: [{ type: mongoose.SchemaTypes.ObjectId }],
  followers: [{ type: mongoose.SchemaTypes.ObjectId }],
  history: [{ type: mongoose.SchemaTypes.ObjectId }],
  savedArticles: [{ type: mongoose.SchemaTypes.ObjectId }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }], // edited
  perfrences: [{ type: String }]

});

schema.set('toJSON', (document, returnedObject) => {
  returnedObject.id = returnedObject.id.toString();
  delete returnedObject._id;
  delete returnedObject.__v;
  delete returnedObject.passwordHash;
});
schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
