const express = require('express');

const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../middlewares/auth');

const userRoutes = require('./users');
const cardRoutes = require('./cards');

router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string(),
      about: Joi.string(),
      avatar: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  controller.login);
router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  controller.postUser);

router.use(auth);
router.get('/users/me', controller.getMyInfo);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;
