const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input-border-error");
  errorElement.classList.add("form__input-error-active")
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input-border-error");
  errorElement.classList.remove("form__input-error-active");
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("save-button-error");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("save-button-error");
  }
};

const setEventListeners = (formElement, validConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = (validConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validConfig.formSelector)
  );

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validConfig);
  });
};

export const clearValidation = (formElement, validConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validConfig.submitButtonSelector
  );
  buttonElement.classList.add(validConfig.inactiveButtonClass);
  buttonElement.disabled = true;
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validConfig);
    inputElement.setCustomValidity("");
  });
};



