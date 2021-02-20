const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      const error = { message: 'Ошибка сервера', statusCode: 500 };
      return next(error);
    });
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        //res.status(400).send({ message: err.message });
        const error = { message: err.message, statusCode: 400 };
        return next(error);
      }
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      const error = { message: err, statusCode: 400 };
      return next(error);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {

      if (!data) {
        const error = { message: `Карточка ${req.param('id')} не найдена!`, statusCode: 404 };
        return next(error);

      }


      return res.send(data);
    })
    .catch((err) => {
      const error = { message: err, statusCode: 500 };
      return next(error);

    }

);
};

const likeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {

      if (!data) {
        const error = { message: `Карточка ${req.param('cardId')} не найдена!`, statusCode: 404 };
        return next(error);

      }

      return res.send(data);
    })
    .catch((err) => {
                const error = { message: err, statusCode: 500 };
        return next(error);
    }

    );
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        const error = { message: `Карточка ${req.param('cardId')} не найдена!`, statusCode: 404 };
        return next(error);

      }
      return res.send(data);
    })
    .catch((err) => {
        const error = { message: err, statusCode: 500 };
        return next(error);

    }
    );
};

module.exports = {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
};
