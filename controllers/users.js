const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(500).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(500).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(500).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        return res.status(500).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(500).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (!user) {
        return res.status(500).send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(500).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
