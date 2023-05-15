require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;
const defaultJwt = 'secret-key';
const mongoDbLink = 'mongodb://127.0.0.1:27017/mestodb';

module.exports = {
  PORT, NODE_ENV, JWT_SECRET, defaultJwt, mongoDbLink,
};
