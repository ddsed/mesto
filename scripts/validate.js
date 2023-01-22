  // СПРИНТ 6

  // Валидация

  const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(obj.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
  };


  const hideIputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(obj.inputErrorClass);

    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
  };


  const isValid = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
      hideIputError(formElement, inputElement, obj);
    }
  };


  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };


  const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(obj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(obj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  };


  const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, obj);

        toggleButtonState(inputList, buttonElement, obj);
      });
    });
  };


  const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));

    formList.forEach((formElement) => {
      setEventListeners(formElement, obj);
    });
  };

  
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
  });