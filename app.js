const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
const ERROR_SERVER = 500;
const ERROR_NOT_FOUND = 404;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '630b566604677097c1c898e4',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' });
});

async function main(req, res) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
  } catch (err) {
    res.status(ERROR_SERVER).send({ message: 'Ошибка на сервере' });
  }
}

main();
