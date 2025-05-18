// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';

import { createCard, deleteCard, handleLikeClick } from './card.js';
import { openModal, closeModal } from './modal.js';
import { config, getCards, changeUserInfo, postFetch, fetchAvatar } from './api.js';
import { enableValidation, clearValidation } from "./validation.js";

export const placesList = document.querySelector('.places__list');

const popupList = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('[data-id="popup-edit"]');
export const popupNewCard = document.querySelector('[data-id="popup-new-card"]');
export const popupeDeleteCard = document.querySelector('[data-id="popupe-delete-card"]');
export const popupeNewAvatar = document.querySelector('[data-id="popupe-new-avatar"]')

export const formElementEdit = document.forms['edit-profile'];
const formElementNewPlace = document.querySelector('[name="new-place"]');
export const formNewAvatar = document.forms['new-avatar']

const popupButtonEdit = document.querySelector('[data-id="button-edit"]');
const saveButtonNewCard = document.querySelector('[data-id="popup__button-save-newcard"]')
const popupButtonAdd = document.querySelector('[data-id="button-add-profile"]');
const popupButtonClose = document.querySelectorAll('[data-id="popup-close"]');
const popupesaveButtonEditprofile = document.querySelector('[data-id="save-button"]');
export const popupButtonDelete = document.querySelector('[data-id="button_delete-card"]');
const popupNewAvatarButton = formNewAvatar.querySelector('[data-id="button_new-avatar"]')

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');
export const cardNameInput = document.querySelector('.popup__input_type_card-name');
export const imgUrlInput = document.querySelector('.popup__input_type_url');
export const newAvatarInput = formNewAvatar.querySelector('.popup__input_type_url__new-avatar')

export const nameUser = document.querySelector('.profile__title');
export const descriptionName = document.querySelector('.profile__description');
export const profilImage = document.querySelector('[data-id="profile-image-container"]')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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
  button.addEventListener('click', (event) => {
    const parentPopup = event.target.closest('.popup');
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

export const renderInitialCards = async (cards) => {
  for (const card of cards) {
    const cardElement = await createCard(
      card,
      deleteCard,
      handleLikeClick,
      handleImageClick,
    );
    placesList.append(cardElement);
  }
};

const addingCard = async () => {
  const newCard = await postFetch();
  if (!newCard) {
    console.error('Карточка не получена с сервера!');
    return;
  }

  const newCardElement = await createCard(
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
  clearValidation(formElementEdit, validationConfig)
  nameInput.value = nameUser.textContent;
  jobInput.value = descriptionName.textContent;
  openModal(popupEdit);
});

popupButtonAdd.addEventListener('click', () => {
  clearValidation(formElementNewPlace, validationConfig)
  openModal(popupNewCard);
});

profilImage.addEventListener('click', () => {
  clearValidation(formNewAvatar, validationConfig)
  openModal(popupeNewAvatar)
})


formElementEdit.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  popupesaveButtonEditprofile.textContent = 'Сохранение...'
  nameUser.textContent = nameInput.value;
  descriptionName.textContent = jobInput.value;
  await changeUserInfo(nameUser, descriptionName).then((data) => {
    console.log('Обновлённые данные:', data)
    data.name = nameUser.value
    data.about = descriptionName.value
  })
  popupesaveButtonEditprofile.textContent = 'Сохранить'
  closeModal(popupEdit);
});

formElementNewPlace.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  saveButtonNewCard.textContent = 'Добавление...'
  await addingCard();
  saveButtonNewCard.textContent = 'Создать'
});

formNewAvatar.addEventListener('submit', async (evt) => {
  evt.preventDefault()
  popupNewAvatarButton.textContent = 'Сохранение...'
  await fetchAvatar(newAvatarInput.value).then(userData => {
    profilImage.src = userData.avatar
  })
  popupNewAvatarButton.textContent = 'Сохранить'
  closeModal(popupeNewAvatar)
})

enableValidation(validationConfig);

// это была очень потная работа... успеваю день в день