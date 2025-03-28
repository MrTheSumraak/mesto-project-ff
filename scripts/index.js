// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const deleteCard = (deleteButton) => {
  const cardElement = deleteButton.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
};

const createCard = (cards, deleteHand) => {
  const cardClone = cardTemplate.cloneNode(true);

  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardDelete = cardClone.querySelector('.card__delete-button');

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.innerText = cards.name;

  cardDelete.addEventListener('click', () => {
    deleteHand(cardDelete);
  });

  return cardClone;
};

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    placesList.appendChild(cardElement);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards(initialCards);
});

