const express = require('express');
const mongoose = require('mongoose');
const UserRouter = require('./routes/user');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use('/', UserRouter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
