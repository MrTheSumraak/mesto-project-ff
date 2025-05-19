// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';

import { createCard, deleteCard, handleLikeClick } from './card.js';
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
export const profileImage = profilImageContainer.querySelector('[data-id="profile-image"]')
const avatar = document.querySelector('.profile__image');

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
    console.log(
      'Ид профиля: ' + profileUserId + 'Имя профиля:' + userData.name,
    );
    console.log('Данные пользователя:', userData);
    console.log('Карточки:', cards);
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
    renderInitialCards(cards, profileUserId);
  })
  .catch((err) => console.error('Ошибка:', err));

export const openDeleteModal = (cardClone, cards, deleteCard) => {
  openModal(popupeDeleteCard);

  const newPopupButtonDelete = document.querySelector(
    '[data-id="button_delete-card"]',
  );

  newPopupButtonDelete.addEventListener('click', () => {
    newPopupButtonDelete.textContent = 'Удаление...';
    deleteCardFetch(cards._id)
      .then(() => {
        console.log(`Карточка ${cards._id} удалена с сервера`);
        deleteCard(cardClone);
        closeModal(popupeDeleteCard); // вроде бы реализовал правильно, насколько понял замечание
        newPopupButtonDelete.textContent = 'Да';
      })
      .catch((err) => console.error('Ошибка:', err));
  });
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
        deleteCard,
        handleLikeClick,
        handleImageClick,
        profileUserId,
      );
      console.log(saveButtonNewCard);

      placesList.prepend(newCardElement);
      closeModal(popupNewCard);
      cardNameInput.value = '';
      imgUrlInput.value = '';
      console.log('Новая карточка:', newCard);
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

formElementEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  popupesaveButtonEditprofile.textContent = 'Сохранение...';

  changeUserInfo(nameInput, jobInput)
    .then((data) => {
      nameUser.textContent = data.name;
      descriptionName.textContent = data.about;
      console.log('Обновлённые данные:', data);

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
  fetchAvatar(newAvatarInput.value).then((userData) => {
    profileImage.src = userData.avatar;
    popupNewAvatarButton.textContent = 'Сохранить';
    closeModal(popupeNewAvatar);
  })
  .catch((err) => console.error('Ошибка:', err));
});

enableValidation(validationConfig);

// это была очень потная работа... успеваю день в день
