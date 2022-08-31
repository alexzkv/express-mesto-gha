const Card = require('../models/card');

const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_SERVER = 500;
const STATUS_OK = 200;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(STATUS_OK).send({ cards }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_OK).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(STATUS_OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(STATUS_OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
      return res.status(STATUS_OK).send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
