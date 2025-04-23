import { handleEscClose } from './index.js';

export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', handleEscClose);
};
