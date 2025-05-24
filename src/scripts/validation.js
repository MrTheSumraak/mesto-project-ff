const showInputError = (formElement, inputElement, errorMessage, validConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validConfig.inputErrorClass);
  errorElement.classList.add(validConfig.errorClass)
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validConfig.inputErrorClass);
  errorElement.classList.remove(validConfig.errorClass);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement, validConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validConfig);
  } else {
    hideInputError(formElement, inputElement, validConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validConfig.inputSelector));
  const buttonElement = formElement.querySelector(validConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validConfig);
      toggleButtonState(inputList, buttonElement, validConfig);
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