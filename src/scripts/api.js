import {
  renderInitialCards,
  imgUrlInput,
  cardNameInput,
  renderProfil,
} from './index.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: '82121952-1538-4120-b1d3-0e8a40198058',
    'Content-Type': 'application/json',
  },
};

// проверка на статус

const checkRequest = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
};

//  Получение информации о пользователе

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkRequest(res));
};

//  Получение карточек

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkRequest(res));
};

// Редактирование профиля

export const changeUserInfo = (nameElement, descriptionElement) => {
  if (!nameElement || !descriptionElement) {
    console.error('Ошибка: Один из DOM-элементов не найден!');
    return;
  }

  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameElement.value,
      about: descriptionElement.value,
    }),
  }).then((res) => checkRequest(res));
};

//  Добавление новой карточки на сервер

export const postFetch = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: imgUrlInput.value,
    }),
  }).then((res) => checkRequest(res));
};

// Удаление карточки

export const deleteCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => checkRequest(res));
};

// Запрос ID пользователя

export const getUserId = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => console.error('Ошибка:', err));
};

// лайк карточки

export const isLikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
};

// снятие лайка карочки

export const isLikeCardDelete = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
};

// обновление аывтара

export const fetchAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
    .then((res) => checkRequest(res))
};
