  // СПРИНТ 6

  // Валидация
  export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'
  };

  export class FormValidator {
    constructor(config, formElement) {
      this._formElement = formElement;
   
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
  
      this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    };
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      inputElement.classList.add(this._inputErrorClass);

      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      inputElement.classList.remove(this._inputErrorClass);

      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    };

    _isValid(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    };

    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
      }
    };

    _setEventListeners() {

      this._toggleButtonState();

      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);

          this._toggleButtonState();
        });
      });
    };

    resetValidation() {
      this._toggleButtonState()
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    };

    enableValidation() {
      this._setEventListeners();
    };
  }