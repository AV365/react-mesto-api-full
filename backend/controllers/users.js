const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ConflictError,
} = require('../errors/index');

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
    .catch(() => {
      // res
      //   .status(401)
      //   .send({ message: err.message });
      // const error = { message: 'Неправильные почта или пароль', statusCode: 401 };
      next(new UnauthorizedError('Неправильные почта или пароль!'));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      // const error = { message: err.message, statusCode: 500 };
      next(new InternalServerError(err.message));
    });
};

const getUser = (req, res, next) => {
  User.findById(req.param('id'))
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Пользователь ${req.param('id')} не найден!`);
      }

      return res.send(data);
    })
    .catch(next)
    .catch((err) => {
      throw new InternalServerError(err.message);
    })
    .catch(next);
};

const getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Пользователь ${req.param('id')} не найден!`);
      }
      return res.send(data);
    })
    .catch(next)
    .catch((err) => {
      throw new InternalServerError(err.message);
    })
    .catch(next);
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
      res.send({
        user: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        throw new ConflictError(`Пользователь c email ${err.keyValue.email} уже зарегистрирован!`);
      }

      throw new InternalServerError(err.message);

      // next({ message: 'Пользователь с таким email уже зарегистрирован', statusCode: 400 });
      // res.status(400).send(err)
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
module.exports = {
  getUsers, getUser, postUser, updateUserProfile, updateUserAvatar, login, getMyInfo,
};
