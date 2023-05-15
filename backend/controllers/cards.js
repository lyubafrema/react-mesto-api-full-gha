const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Card = require('../models/card');
const {
  HTTP_STATUS_ID_NOT_FOUND,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  okCode,
} = require('../utils/constants');

// создаем карточку
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(HTTP_STATUS_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// получаем все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

// удаляем карточку
const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError(HTTP_STATUS_NOT_FOUND);
    }
    if (card.owner.toString() !== (req.user._id)) {
      throw new ForbiddenError(HTTP_STATUS_FORBIDDEN);
    }
    card.deleteOne()
      .then(() => res.status(okCode).send({ message: 'Карточка удалена.' }))
      .catch(next);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(HTTP_STATUS_BAD_REQUEST));
    } else {
      next(err);
    }
  });

// ставим лайк
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавим _id в массив, если его там нет
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError(HTTP_STATUS_ID_NOT_FOUND);
      }
      return res.send(card);
    })
    .catch(next);
};

// убираем лайк
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // уберем _id из массива
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError(HTTP_STATUS_ID_NOT_FOUND);
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
