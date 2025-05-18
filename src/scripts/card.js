import {
  getUserId,
  deleteCardFetch,
  isLikeCard,
  isLikeCardDelete,
} from './api.js';
import { popupeDeleteCard, popupButtonDelete } from './index.js';
import { openModal, closeModal } from './modal.js';

export const deleteCard = (deleteButton) => {
  const cardElement = deleteButton.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
};

export const createCard = async (
  cards,
  deleteCard,
  handleLikeClick,
  handleImageClick,
) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardDelete = cardClone.querySelector('.card__delete-button');
  const likeButton = cardClone.querySelector('.card__like-button');
  const likeContainer = cardClone.querySelector('.card-likes');

  const idUser = await getUserId().then((data) => data._id)

  const isLiked = cards.likes.some(like => like._id === idUser);
  
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  if (idUser !== cards.owner._id) {
    cardDelete.style.display = 'none';
  }

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.textContent = cards.name;
  likeContainer.textContent = cards.likes.length;

  cardDelete.addEventListener('click', () => {
    openModal(popupeDeleteCard);

    popupButtonDelete.replaceWith(popupButtonDelete.cloneNode(true));
    const newPopupButtonDelete = document.querySelector(
      '[data-id="button_delete-card"]',
    );

    newPopupButtonDelete.addEventListener('click', () => {
      deleteCard(cardClone);
      deleteCardFetch(cards._id).then(() => {
      console.log(`Карточка ${cards._id} удалена с сервера`);
    });
      closeModal(popupeDeleteCard);
    });
  });

  cardImage.addEventListener('click', () => handleImageClick(cards));
  likeButton.addEventListener('click', async () => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active'); 
  
  handleLikeClick(likeButton);
  checkLike(isLiked, likeContainer, cards._id)
})

  return cardClone;
};

export const handleLikeClick = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
};

const checkLike = async (like, likeCont, cardId) => {
  const updatedCard = await (like ? isLikeCardDelete(cardId) : isLikeCard(cardId)); 
  likeCont.textContent = updatedCard.likes.length
}

// const wdff = (likeBtn, id) => {
//   if (id) {
//     handleLikeClick(likeBtn)
//   } else {
//     likeButton.classList.remove('card__like-button_is-active')
//   }
// }