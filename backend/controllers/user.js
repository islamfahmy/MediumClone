const userRouter = require('express').Router();
const User = require('../models/User');

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users.toJSON());
});

userRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // TODO: populate fields
  res.json(user.toJSON());
});
