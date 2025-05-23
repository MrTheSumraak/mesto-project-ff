// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';

import { createCard, handleLikeClick } from './card.js';
import { openModal, closeModal } from './modal.js';
import {
  getUser,
  getCards,
  changeUserInfo,
  postFetch,
  fetchAvatar,
  deleteCardFetch,
} from './api.js';
import { enableValidation, clearValidation } from './validation.js';

export const placesList = document.querySelector('.places__list');

const popupList = document.querySelectorAll('.popup');
export const popupEdit = document.querySelector('[data-id="popup-edit"]');
export const popupNewCard = document.querySelector(
  '[data-id="popup-new-card"]',
);
export const popupeDeleteCard = document.querySelector(
  '[data-id="popupe-delete-card"]',
);
export const popupeNewAvatar = document.querySelector(
  '[data-id="popupe-new-avatar"]',
);

export const formElementEdit = document.forms['edit-profile'];
const formElementNewPlace = document.querySelector('[name="new-place"]');
export const formNewAvatar = document.forms['new-avatar'];

const popupButtonEdit = document.querySelector('[data-id="button-edit"]');
const saveButtonNewCard = document.querySelector(
  '[data-id="popup__button-save-newcard"]',
);
const popupButtonAdd = document.querySelector('[data-id="button-add-profile"]');
const popupButtonClose = document.querySelectorAll('[data-id="popup-close"]');
const popupesaveButtonEditprofile = document.querySelector(
  '[data-id="save-button"]',
);
export const newPopupButtonDelete = document.querySelector(
  '[data-id="button_delete-card"]',
);

const popupImage = document.querySelector('[data-id="popup-image"]');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaptionElement = popupImage.querySelector('.popup__caption');

export const popupButtonDelete = document.querySelector(
  '[data-id="button_delete-card"]',
);
const popupNewAvatarButton = formNewAvatar.querySelector(
  '[data-id="button_new-avatar"]',
);

export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector(
  '.popup__input_type_description',
);
export const cardNameInput = document.querySelector(
  '.popup__input_type_card-name',
);
export const imgUrlInput = document.querySelector('.popup__input_type_url');
export const newAvatarInput = formNewAvatar.querySelector(
  '.popup__input_type_url__new-avatar',
);

export const nameUser = document.querySelector('.profile__title');
export const descriptionName = document.querySelector('.profile__description');
export const profilImageContainer = document.querySelector(
  '[data-id="profile-image-container"]',
);
export const profileImage = profilImageContainer.querySelector(
  '[data-id="profile-image"]',
);
const avatar = document.querySelector('.profile__image');

let cardCurrent = null
let cardCurrentElement = null

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

export const renderProfil = (data) => {
  nameUser.textContent = data.name;
  descriptionName.textContent = data.about;
  avatar.src = data.avatar;
};

let profileUserId;

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    profileUserId = userData._id;
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    avatar.style.backgroundImage = `url(${userData.avatar})`;
    cards.forEach((card) => {
      placesList.append(
        createCard(
          card,
          openDeleteModal,
          handleLikeClick,
          handleImageClick,
          profileUserId,
        ),
      );
    });
    renderProfil(userData);
  })
  .catch((err) => console.error('Ошибка:', err));

export const openDeleteModal = (cardData, cardElement) => {
  cardCurrent = cardData
  cardCurrentElement = cardElement;
  openModal(popupeDeleteCard);
};

export const deleteCard = (card) => {
  newPopupButtonDelete.textContent = 'Удаление...';

  deleteCardFetch(card._id)
    .then(() => {
      console.log(`Карточка ${card._id} удалена с сервера`);
      cardCurrentElement.remove()
      closeModal(popupeDeleteCard);
      cardCurrent = null;
    })
    .catch((err) => {
      console.error('Ошибка удаления:', err);
    })
    .finally(() => (newPopupButtonDelete.textContent = 'Да'));
};

export const handleImageClick = (card) => {
  popupImageElement.src = card.link;
  popupImageElement.alt = card.name;
  popupCaptionElement.textContent = card.name;
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

export function renderInitialCards(cards, userId) {
  for (const card of cards) {
    const cardElement = createCard(
      card,
      openDeleteModal,
      handleLikeClick,
      handleImageClick,
      userId,
    );
    placesList.append(cardElement);
  }
}

const addingCard = () => {
  saveButtonNewCard.textContent = 'Добавление...';
  postFetch()
    .then((newCard) => {
      const newCardElement = createCard(
        newCard,
        openDeleteModal,
        handleLikeClick,
        handleImageClick,
        profileUserId,
      );

      placesList.prepend(newCardElement);
      closeModal(popupNewCard);
      cardNameInput.value = '';
      imgUrlInput.value = '';
      saveButtonNewCard.textContent = 'Создать';
    })
    .catch((err) => console.error('Ошибка:', err));
};

popupButtonEdit.addEventListener('click', () => {
  clearValidation(formElementEdit, validationConfig);
  nameInput.value = nameUser.textContent;
  jobInput.value = descriptionName.textContent;
  openModal(popupEdit);
});

popupButtonAdd.addEventListener('click', () => {
  clearValidation(formElementNewPlace, validationConfig);
  openModal(popupNewCard);
});

profilImageContainer.addEventListener('click', () => {
  clearValidation(formNewAvatar, validationConfig);
  openModal(popupeNewAvatar);
});

newPopupButtonDelete.addEventListener('click', () => {
  deleteCard(cardCurrent);
});

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupesaveButtonEditprofile.textContent = 'Сохранение...';

  changeUserInfo(nameInput, jobInput)
    .then((data) => {
      nameUser.textContent = data.name;
      descriptionName.textContent = data.about;

      closeModal(popupEdit);
    })
    .catch((err) => console.error('Ошибка:', err))
    .finally(() => {
      popupesaveButtonEditprofile.textContent = 'Сохранить';
    });
});

formElementNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addingCard();
});

formNewAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupNewAvatarButton.textContent = 'Сохранение...';
  fetchAvatar(newAvatarInput.value)
    .then((userData) => {
      profileImage.src = userData.avatar;
      closeModal(popupeNewAvatar);
    })
    .catch((err) => console.error('Ошибка:', err))
    .finally(() => {
      popupNewAvatarButton.textContent = 'Сохранить';
    });
});

enableValidation(validationConfig);

// это была очень потная работа... успеваю день в день.
