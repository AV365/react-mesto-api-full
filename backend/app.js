const express = require('express');
const cors = require('cors');

const options = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://mesto.av365.ru',
    'http://www.mesto.av365',
    'https://mesto.av365.ru',
    'https://www.mesto.av365',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
const PORT = 3001;

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
  });

const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use('*', cors(options));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

const NotFoundError = require('./errors/404-not-found-error');
const router = require('./routes');

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', router);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден!');
});

// лог ошибок
app.use(errorLogger);

// Обработка ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  console.log(err);
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT} port`);
});
