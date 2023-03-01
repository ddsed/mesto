export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._photo = data.link;
        this._alt = data.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _getElementFromTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _deleteCard() {
        this._element.remove();
    }

    _toggleLike() {
        this._likeButton.classList.toggle('element__like_active');
    }

    getElement() {
        this._element = this._getElementFromTemplate();

        this._cardPhoto = this._element.querySelector('.element__photo');
        this._cardPhoto.src = this._photo;
        this._cardPhoto.alt = this._name;

        this._cardTitle = this._element.querySelector('.element__title');
        this._cardTitle.textContent = this._name;

        this._addEventListeners();

        return this._element;
    }

    _addEventListeners() {
        this._deleteButton = this._element.querySelector('.element__delete');
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })

        this._likeButton = this._element.querySelector('.element__like');
        this._likeButton.addEventListener('click', () => {
            this._toggleLike();
        })

        this._cardPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._photo)
        });
    }
}
