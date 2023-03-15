import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmationButton = this._popup.querySelector('.popup__submit-button');
    }

    handleDelete(func) {
        this._removeCard = func;
    }

    setEventListeners() {
        super.setEventListeners();
    
        this._confirmationButton.addEventListener("click", () => {
          this._removeCard();
        });
    }

}