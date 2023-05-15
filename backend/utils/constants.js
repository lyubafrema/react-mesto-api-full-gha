// константы для кодов и сообщений об ошибках
const HTTP_STATUS_BAD_REQUEST = 'Переданы некорректные данные';
const HTTP_STATUS_UNAUTHORIZED = 'Неправильные почта или пароль';
const HTTP_STATUS_NOT_FOUND = 'Информация не найдена';
const HTTP_STATUS_ID_NOT_FOUND = 'Id не найден';
const HTTP_STATUS_CONFLICT = 'Такой email уже используется';
const HTTP_STATUS_FORBIDDEN = 'Ошибка доступа';

const okCode = 200;

const urlRegEx = /^((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&\\=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&\\=]*)((\/[a-zA-Z0-9@:%._\\+~#?&\\=-]{2,256})*)?/;

module.exports = {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_ID_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_FORBIDDEN,
  okCode,
  urlRegEx,
};
