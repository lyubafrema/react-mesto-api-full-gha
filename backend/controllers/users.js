require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_NOT_FOUND,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const BadRequestError = require('../errors/bad-request-err');
const { NODE_ENV, JWT_SECRET, defaultJwt } = require('../config');

// создаем пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((newUser) => {
        res.status(201).send({
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(HTTP_STATUS_CONFLICT));
        } else if (err.name === 'ValidationError') {
          next(new BadRequestError(HTTP_STATUS_BAD_REQUEST));
        } else {
          next(err);
        }
      });
  })
    .catch(next);
};

// аутентификация
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(HTTP_STATUS_UNAUTHORIZED);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError(HTTP_STATUS_UNAUTHORIZED));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : defaultJwt,
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

// получаем текущего пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch(next);
};

// получаем пользователя по id
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch(next);
};

// получаем всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// обновляем информацию профиля
const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(HTTP_STATUS_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// обновляем аватар
const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(HTTP_STATUS_NOT_FOUND);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(HTTP_STATUS_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
};
