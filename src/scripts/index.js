// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// import avatar from '../images/avatar.jpg'

import '../pages/index.css';
import { createCard, deleteCard, handleLikeClick } from './card.js';
import { openModal, closeModal } from './modal.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const placesList = document.querySelector('.places__list');
const popupButtonEdit = document.querySelector('[data-id="button-edit"]');
const popupButtonAdd = document.querySelector('[data-id="button-add-profile"]');
const popupButtonClose = document.querySelectorAll('[data-id="popup-close"]');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('[data-id="popup-edit"]');
const popupNewCard = document.querySelector('[data-id="popup-new-card"]');
const nameUser = document.querySelector('.profile__title');
const descriptionName = document.querySelector('.profile__description');
const formElementEdit = document.forms['edit-profile'];
const formElementNewPlace = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imgUrlInput = document.querySelector('.popup__input_type_url');

export const handleImageClick = (cards) => {
  const popupImage = document.querySelector('[data-id="popup-image"]');
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');
  popupImageElement.src = cards.link;
  popupImageElement.alt = cards.name;
  popupCaptionElement.textContent = cards.name;
  openModal(popupImage);
};

popupList.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

popupButtonClose.forEach((button) => {
  button.addEventListener('click', (ev) => {
    const parentPopup = ev.target.closest('.popup');
    if (parentPopup) {
      closeModal(parentPopup);
    }
  });
});

popupList.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (
      event.target.closest('.popup') &&
      !event.target.closest('.popup__content')
    ) {
      closeModal(popup);
    }
  });
});

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    const cardElement = createCard(
      card,
      deleteCard,
      handleLikeClick,
      handleImageClick,
    );
    placesList.append(cardElement);
  });
};

const addingCard = () => {
  const newCard = { name: cardNameInput.value, link: imgUrlInput.value };
  const newCardElement = createCard(
    newCard,
    deleteCard,
    handleLikeClick,
    handleImageClick,
  );
  placesList.prepend(newCardElement);
  closeModal(popupNewCard);
  cardNameInput.value = '';
  imgUrlInput.value = '';
};

popupButtonEdit.addEventListener('click', () => {
  nameInput.value = nameUser.textContent;
  jobInput.value = descriptionName.textContent;
  openModal(popupEdit);
});

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  descriptionName.textContent = jobInput.value;
  closeModal(popupEdit);
});

popupButtonAdd.addEventListener('click', () => {
  openModal(popupNewCard);
});

formElementNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addingCard();
});

document.addEventListener('DOMContentLoaded', () => {
  renderInitialCards(initialCards);
});
