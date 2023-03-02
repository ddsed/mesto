import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
      super(popupSelector);
  
      this._form = this._popup.querySelector('.popup__form');
      this._inputs = Array.from(this._form.querySelectorAll('.popup__item'));
      this._handleSubmitForm = handleSubmitForm;
    }

    _getInputValues() {
        const data = {}; 
    
        this._inputs.forEach((input) => {
          data[input.name] = input.value;
        });
        return data;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleSubmitForm(this._getInputValues());
        });
        this.close();

        super.setEventListeners();
    }
}