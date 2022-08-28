const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
} = require('../controllers/user');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);

module.exports = userRouter;
