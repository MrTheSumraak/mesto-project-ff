import { isLikeCard, isLikeCardDelete } from './api.js';

import { openDeleteModal } from './index.js';

export const deleteCard = (element) => {
  const cardElement = element.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
};

export const createCard = (
  cards,
  deleteCard,
  handleLikeClick,
  handleImageClick,
  userId,
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const likeButton = cardClone.querySelector('.card__like-button');
  const cardDelete = cardClone.querySelector('.card__delete-button');
  const likeContainer = cardClone.querySelector('.card-likes');
  const isLiked = cards.likes?.some((like) => like._id === userId) || false;

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
  if (userId !== cards.owner._id) {
    cardDelete.style.display = 'none';
  }

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.textContent = cards.name;
  likeContainer.textContent = cards.likes.length;

  cardDelete.addEventListener('click', () => {
    openDeleteModal(cardClone, cards, deleteCard);
  });

  cardImage.addEventListener('click', () => handleImageClick(cards));
  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton, likeContainer, cards._id);
  });

  return cardClone;
};

export function handleLikeClick(likeButton, likeContainer, cardId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const likeAction = isLiked ? isLikeCardDelete(cardId) : isLikeCard(cardId);

  likeAction
    .then((likeCard) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeContainer.textContent = likeCard.likes.length;
    })
    .catch((error) => console.error('Ошибка лайка:', error));
}