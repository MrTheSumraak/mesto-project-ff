// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import initialCards from './card.js';
import { createCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { handleImageClick }from './card.js'
import { handleLikeClick } from './card.js'

const placesList = document.querySelector('.places__list');
const popupButtonEdit = document.querySelector('[data-id="button-edit"]');
const popupButtonAdd = document.querySelector('[data-id="button-add-profile"]');
const popupButtonClose = document.querySelectorAll('[data-id="popup-close"]');
const popupEdit = document.querySelector('[data-id="popup-edit"]');
const popupNewCard = document.querySelector('[data-id="popup-new-card"]');
// const popupImage = document.querySelector('[data-id="popup-image"]');
const popup = document.querySelectorAll('.popup');
const nameUser = document.querySelector('.profile__title');
const descriptionName = document.querySelector('.profile__description');
const formElementEdit = document.querySelector('[name="edit-profile"]');
const formElementNewPlace = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const imgUrlInput = document.querySelector('.popup__input_type_url');

export const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup) {
      closeModal(activePopup);
    }
  }
};

popupButtonClose.forEach((button) => {
  button.addEventListener('click', () => {
    popup.forEach((popupElement) => {
      closeModal(popupElement);
    });
  });
});

popup.forEach((el) => {
  el.addEventListener('click', (event) => {
    if (!event.target.closest('.popup__content')) {
      closeModal(el);
    }
  });
});

const renderInitialCards = (cards) => {
  cards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, handleLikeClick, handleImageClick);
    placesList.appendChild(cardElement);
  });
};

const addingCard = () => {
  const newCard = {
    name: cardNameInput.value,
    link: imgUrlInput.value,
  };

  initialCards.unshift(newCard);
  const newCardElement = createCard(newCard, deleteCard, handleLikeClick, handleImageClick);
  placesList.prepend(newCardElement);
  closeModal(popupNewCard);
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
