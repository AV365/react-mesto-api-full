const express = require('express');

const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const controller = require('../controllers/users');

const regexpUrl = /https?:\/\/[\w\d-]*\.*[\w\d-]{2,}.\/*[\w\d-]+.[-._~:/?#[\]@!$&'()*+,;=\w\d]*#*$/im;

router.get('/',
  controller.getUsers);
router.get('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  controller.getUser);

router.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  controller.updateUserProfile);
router.patch('/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .pattern(new RegExp(regexpUrl))
        .required(),
    }),
  }),
  controller.updateUserAvatar);

module.exports = router;
