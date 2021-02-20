const express = require('express');

const router = express.Router();
const controller = require('../controllers/cards');

router.get('/', controller.getCards);
router.post('/', controller.postCard);
router.delete('/:id', controller.deleteCard);

router.put('/:cardId/likes', controller.likeCard);
router.delete('/:cardId/likes', controller.dislikeCard);

module.exports = router;
