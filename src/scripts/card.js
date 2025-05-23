import { isLikeCard, isLikeCardDelete } from './api.js';

export const createCard = (
  card,
  openDeleteModal,
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
  const isLiked = card.likes?.some((like) => like._id === userId) || false;

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }
  if (userId !== card.owner._id) {
    cardDelete.style.display = 'none';
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likeContainer.textContent = card.likes.length;

  cardDelete.addEventListener('click', (ev) => {
    openDeleteModal(card, ev.target.closest('.card'));  // надеюсь теперь так, или я опять не понял...
  });

  cardImage.addEventListener('click', () => handleImageClick(card));
  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton, likeContainer, card._id);
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
