const express = require('express');

const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const controller = require('../controllers/cards');

const regexpUrl = /https?:\/\/[\w\d-]*\.*[\w\d-]{2,}.\/*[\w\d-]+.[-._~:/?#[\]@!$&'()*+,;=\w\d]*#*$/im;

router.get('/', controller.getCards);
router.post('/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string()
        .pattern(new RegExp(regexpUrl))
        .required(),
    }),
  }),
  controller.postCard);
router.delete('/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  controller.deleteCard);

router.put('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  controller.likeCard);
router.delete('/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  controller.dislikeCard);

module.exports = router;
