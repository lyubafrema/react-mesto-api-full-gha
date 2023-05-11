const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateLogin } = require('../middlewares/validators');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => next(new NotFoundError('Error 404: Страница не найдена')));

module.exports = router;
