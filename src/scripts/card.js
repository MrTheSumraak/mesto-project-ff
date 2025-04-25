export const deleteCard = (deleteButton) => {
  const cardElement = deleteButton.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
};

export const createCard = (cards, deleteCard, handleLikeClick, handleImageClick) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardDelete = cardClone.querySelector('.card__delete-button');
  const likeButton = cardClone.querySelector('.card__like-button');

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.textContent = cards.name;

  cardDelete.addEventListener('click', () => deleteCard(cardDelete));
  cardImage.addEventListener('click', () => handleImageClick(cards));
  likeButton.addEventListener('click', () => handleLikeClick(likeButton));

  return cardClone;
};

export const handleLikeClick = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};