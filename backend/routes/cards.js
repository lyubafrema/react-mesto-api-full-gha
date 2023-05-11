const cardsRouter = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateId, validateCardBody } = require('../middlewares/validators');

cardsRouter.delete('/:cardId/likes', validateId, dislikeCard);
cardsRouter.put('/:cardId/likes', validateId, likeCard);
cardsRouter.delete('/:cardId', validateId, deleteCard);
cardsRouter.get('/', getCards);

cardsRouter.post('/', validateCardBody, createCard);

module.exports = cardsRouter;
