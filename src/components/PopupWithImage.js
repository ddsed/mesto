import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector); 
      this._popupImagePhoto = this._popup.querySelector('.popup__photo');
      this._popupImageTitle = this._popup.querySelector('.popup__title_type_image');
    }

    open(name, link) {
        this._popupImagePhoto.src = link;
        this._popupImagePhoto.alt = name;
        this._popupImageTitle.textContent = name;

        super.open();
    }
}