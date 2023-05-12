import { configApi } from './utils';
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // метод проверки ответа от сервера
  _handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    console.log(`Произошла ошибка: ${response}`);
    return Promise.reject(`Статус ошибки: ${response.status}`);
  }

  // универсальный метод запроса
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse)
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  // загрузка информации о пользователе с сервера
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  // редактирование профиля
  editProfileInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    });
  }

  // добавление новой карточки
  addNewCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    });
  }

  // удаление своей карточки
  deleteCard(id) {
    return this._request(`${this._baseUrl}/cards/${id} `, {
      method: "DELETE",
      headers: this._headers
    });
  }

  // меняем информацию о наличие лайка на карточке
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
      })
    } else {
      return this._request(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      });
    }
  }

  // сменить аватар
  changeAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    });
  }
}

const api = new Api(configApi);
export { api };
