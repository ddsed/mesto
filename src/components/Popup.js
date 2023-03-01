export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupCloseButtons = document.querySelectorAll('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._clickOnOverlay = this._clickOnOverlay.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('mousedown', this._clickOnOverlay);
    }
    
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('mousedown', this._clickOnOverlay);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _clickOnOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            this.close(evt.currentTarget);
        }
    }

    setEventListeners() {
        this._popupCloseButtons.forEach((button) => {
            const popup = button.closest('.popup');
            button.addEventListener('click', () => this.close(popup));
          });
    }
}
