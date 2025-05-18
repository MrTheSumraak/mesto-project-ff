import { renderInitialCards, imgUrlInput, cardNameInput, profilImage, nameUser, descriptionName } from './index.js';

export const config = {
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

const renderProfil = (data) => {
  const avatar = document.querySelector('.profile__image');
  nameUser.textContent = data.name;
  descriptionName.textContent = data.about;
  avatar.src = data.avatar;
};

const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkRequest(res))
  .catch((err) => console.error('Ошибка:', err))
};

//  Получение карточек

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkRequest(res))
  .catch((err) => console.error('Ошибка:', err));
};

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    if (!userData) {
      console.error('Ошибка: Данные пользователя не загружены!');
      return;
    }
    console.log('Данные пользователя:', userData);
    console.log('Карточки:', cards);

    renderProfil(userData);
    renderInitialCards(cards);
  })
  .catch((err) => console.error('Ошибка:', err));

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
      name: nameElement.textContent,
      about: descriptionElement.textContent,
    }),
  })
    .then((res) => checkRequest(res))
    
    .catch((err) => console.error('Ошибка:', err));
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
  })
    .then(res => checkRequest(res))
    .then(newCard => {
      console.log('Новая карточка:', newCard);
      return newCard;
    })
    .catch((err) => console.error('Ошибка:', err));
};

// Удаление карточки

export const deleteCardFetch = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => checkRequest(res))
    .catch((err) => console.error('Ошибка:', err));
}

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
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => checkRequest(res))
  .catch((err) => console.error('Ошибка:', err))
}

// снятие лайка карочки

export const isLikeCardDelete = (cardId) => {
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => checkRequest(res))
  .catch((err) => console.error('Ошибка:', err))
}

// обновление аывтара

export const fetchAvatar = (avatarUrl) => {
  return fetch (`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(res => checkRequest(res))
  .catch((err) => console.error('Ошибка:', err))
}