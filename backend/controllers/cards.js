const Card = require('../models/card');
const {
  BadRequestError, InternalServerError, NotFoundError, ForbiddenError,
} = require('../errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      throw new InternalServerError(err.message);
    }).catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // res.status(400).send({ message: err.message });
        // const error = { message: err.message, statusCode: 400 };
        // return next(error);
        throw new BadRequestError(err.message);
      }
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id).then((data) => {
    if (!data) {
      throw new BadRequestError(`Элемент ${req.params.id} не найден`);
    }
    if (String(data.owner) !== String(req.user._id)) {
      throw new ForbiddenError('А теперь нельзя удалить!');
    }
    Card.findByIdAndRemove(req.params.id)
      .then((card) => {
        if (!card) {
          throw new NotFoundError(`Карточка ${req.param('id')} не найдена!`);
        }
        return res.send(card);
      });
    res.send({ data });
  })
    .catch(next);

  // Card.findByIdAndRemove(req.params.id)
  //     .then((data) => {
  //     if (!data) {
  //       //const error = { message: `Карточка ${req.param('id')} не найдена!`, statusCode: 404 };
  //       //return next(error);
  //       throw new NotFoundError(`Карточка ${req.param('id')} не найдена!`);
  //     }
  //     return res.send(data);
  //   })
  //   .catch(next)
  //   .catch((err) => {
  //     throw new InternalServerError(err.message);
  //   }).catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Карточка ${req.param('cardId')} не найдена!`);
      }
      return res.send(data);
    })
    .catch(next)
    .catch((err) => {
      throw new InternalServerError(err.message);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Карточка ${req.param('cardId')} не найдена!`);
      }
      return res.send(data);
    })
    .catch(next)
    .catch((err) => {
      throw new InternalServerError(err.message);
    })
    .catch(next);
};

module.exports = {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
};
