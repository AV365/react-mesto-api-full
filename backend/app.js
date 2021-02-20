const express = require('express');
var cors = require('cors');


const app = express();
const PORT = 3001;

require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true
  });


const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

const router = require('./routes');

// app.use((req, res, next) => {
//   req.user = {
//     //    _id: '5ffc551b6b47372d1cb08b66',
//     _id: '5ffc56ab6b47372d1cb08b67', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };
//   next();
// });

app.use(cors());
app.use(requestLogger);
app.use('/', router);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

//лог ошибок
app.use(errorLogger);


//Обработка ошибок

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
        : message
    });
});

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT} port`);
});
