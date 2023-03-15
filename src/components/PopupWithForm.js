import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmitForm }) {
      super(popupSelector);
  
      this._form = this._popup.querySelector('.popup__form');
      this._inputs = this._popup.querySelectorAll('.popup__item');
      this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        this._inputValues = {}; 
    
        this._inputs.forEach((input) => {
          this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmitForm(this._getInputValues());
      });
      this.close();
    }
}