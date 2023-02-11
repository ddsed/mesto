class Card {
    constructor(templateSelector, data) {
        this._name = data.name;
        this._photo = data.link;
        this._alt = data.name;
        this._templateSelector = templateSelector;
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

    _likeCard() {
        this._element.querySelector(".element__like").classList.toggle('element__like_active');
    }

    _addEventListeners() {
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard();
        })
    }

    getElement() {
        this._element = this._getElementFromTemplate();
        this._element.querySelector('.element__photo').src = this._photo;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this._addEventListeners();

        return this._element;
    }
}

export default Card;
