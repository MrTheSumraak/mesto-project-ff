export const openModal = (popup) => {
   popup.classList.add('popup_is-opened');
};

export const closeModal = (popup) => {
   popup.classList.remove('popup_is-opened');
   popup.classList.add('popup_is-animated');
};
