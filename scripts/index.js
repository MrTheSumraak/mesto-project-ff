// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const cardCreate = (cards) => {
  const cardClone = cardTemplate.cloneNode(true);

  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardDelete = cardClone.querySelector('.card__delete-button');

  cardImage.src = cards.link;
  cardTitle.innerText = cards.name;

  cardDelete.addEventListener('click', () => {
    const cardElement = cardDelete.closest('.card');
    if (cardElement) {
      cardElement.remove();
    }
  });

  return cardClone;
};

const cardLoad = (cards) => {
  cards.forEach((card) => {
    const cardElement = cardCreate(card);
    placesList.appendChild(cardElement);
  });
};

document.addEventListener('DOMContentLoaded', cardLoad(initialCards));
