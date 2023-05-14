const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const cors = require('./middlewares/cors');
const defaultErr = require('./errors/default-err');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(defaultErr);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000);
// app.listen(3001);
