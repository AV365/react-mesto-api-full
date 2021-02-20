const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }, // токен будет просрочен через 7 дней после создания
      );
      res.send({ token });
    })
    .catch((err) => {
      // res
      //   .status(401)
      //   .send({ message: err.message });
      const error = { message: 'Неправильные почта или пароль', statusCode: 401 };
      next(error);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      const error = { message: err.message, statusCode: 500 };
      next(error);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.param('id'))
    .then((data) => {
      if (!data) {
        const error = { message: `Пользователь ${req.param('id')} не найден!`, statusCode: 404 };
        next(error);

      }


      return res.send(data);
    })
    .catch((err) => {

      const error = { message: err.message, statusCode: 500 };
      next(error);
    }


);
};

const getMyInfo = (req, res, next) => {
    User.findById(req.user._id)
    .then((data) => {
      if (!data) {
      const error = { message: `Пользователь ${req.param('id')} не найден!`, statusCode: 404 };
      next(error);

    }


      return res.send(data);
    })
    .catch((err) => {

        const error = { message: err.message, statusCode: 500 };
        next(error);
      }
    );
};

const postUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash, // записываем хеш в базу
    }))

    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next({ message: 'Пользователь с таким email уже зарегистрирован', statusCode: 400 });
      //res.status(400).send(err)
    });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ message: err.message, statusCode: 400 });

      }
    })
    .then((user) => res.send({ data: user }))
    .catch(() => next({ message: 'Ошибка сервера', statusCode: 500 }));
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next({ message: err.message, statusCode: 400 });
      }
    })
    .then((user) => res.send({ data: user }))
    .catch(() => next({ message: 'Ошибка сервера', statusCode: 500 }));
};
module.exports = {
  getUsers, getUser, postUser, updateUserProfile, updateUserAvatar, login, getMyInfo
};
