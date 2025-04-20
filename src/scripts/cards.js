const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export const deleteCard = (deleteButton) => {
  const cardElement = deleteButton.closest('.card');
  if (cardElement) {
    cardElement.remove();
  }
};

export const createCard = (cards, deleteHand, openPopup, popupImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const cardDelete = cardClone.querySelector('.card__delete-button');
  const likeButton = cardClone.querySelector('.card__like-button');

  cardImage.src = cards.link;
  cardImage.alt = cards.name;
  cardTitle.innerText = cards.name;

  cardDelete.addEventListener('click', () => {
    deleteHand(cardDelete);
  });

  cardImage.addEventListener('click', () => {
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaptionElement = popupImage.querySelector('.popup__caption');

    popupImageElement.src = cards.link;
    popupImageElement.alt = cards.name;
    popupCaptionElement.textContent = cards.name;

    openPopup(popupImage);
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  return cardClone;
};

export default initialCards;
