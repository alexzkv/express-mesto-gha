const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);

app.post('/signup', createUser);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Произошла ошибка на сервере'
      : message,
  });
  next(err);
});

async function main(req, res, next) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
  } catch (err) {
    next(new NotFoundError('Ошибка на сервере'));
  }
}

main();
