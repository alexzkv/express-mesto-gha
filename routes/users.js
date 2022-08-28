const userRouter = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);

module.exports = userRouter;
