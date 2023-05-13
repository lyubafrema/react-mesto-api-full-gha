// export const BASE_URL = 'http://api.lyubafrema.nomoredomains.monster';
export const BASE_URL = 'http://localhost:3000';

const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  console.log(`Произошла ошибка: ${response.statusText}`);
  return Promise.reject(`Статус ошибки: ${response.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse);
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(handleResponse);
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
    .then((res) => {
      console.log(res)
      res.json()
    })
    .catch((err) => console.log(err))
}