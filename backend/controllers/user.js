const userRouter = require('express').Router();
const User = require('../models/User');
userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('articles',{ title: 1, likes: 1 });//edited
  res.json(users.toJSON());
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('articles',{ title: 1, likes: 1 });//edited
  res.json(user.toJSON());
});
module.exports = userRouter//edited
