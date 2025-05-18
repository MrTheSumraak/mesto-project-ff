export const handleEscClose = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    if (activePopup) {
      closeModal(activePopup);
    }
  }
};

export const openModal = (popup, form) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};