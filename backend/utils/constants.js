// константы для кодов и сообщений об ошибках
const errorMessageIncorrect = 'Переданы некорректные данные';
const errorMessageUnauthorized = 'Неправильные почта или пароль';
const errorMessageNotFound = 'Информация не найдена';
const errorMessageNotFoundId = 'Id не найден';
const errorMessageConflict = 'Такой email уже используется';
const errorForbidden = 'Ошибка доступа';

const okCode = 200;

const urlRegEx = /^((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&\\=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&\\=]*)((\/[a-zA-Z0-9@:%._\\+~#?&\\=-]{2,256})*)?/;

module.exports = {
  errorMessageIncorrect,
  errorMessageUnauthorized,
  errorMessageNotFound,
  errorMessageNotFoundId,
  errorMessageConflict,
  errorForbidden,
  okCode,
  urlRegEx,
};
