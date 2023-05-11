const usersRouter = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUpdateUser, validateUpdateAvatar, validateUserId } = require('../middlewares/validators');

usersRouter.patch('/me/avatar', validateUpdateAvatar, updateAvatar);
usersRouter.patch('/me', validateUpdateUser, updateProfile);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:userId', validateUserId, getUser);
usersRouter.get('/', getUsers);

module.exports = usersRouter;
