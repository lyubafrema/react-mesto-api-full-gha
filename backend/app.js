const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const cors = require('./middlewares/cors');
const handleDefaultErr = require('./errors/default-err');
const NotFoundError = require('./errors/not-found-err');
const { HTTP_STATUS_NOT_FOUND } = require('./utils/constants');
const { PORT, mongoDbLink } = require('./config');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(requestLogger);

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use((req, res, next) => {
  next(new NotFoundError(HTTP_STATUS_NOT_FOUND));
});

app.use(errorLogger);
app.use(errors());
app.use(handleDefaultErr);

mongoose.connect(mongoDbLink);

app.listen(PORT);
