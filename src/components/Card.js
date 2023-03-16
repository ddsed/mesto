export default class Card {
    constructor(data, templateSelector, currentUserId, { handleCardClick, handleDeleteClick, handleAddLike, handleDeleteLike }) {
        this._name = data.name;
        this._photo = data.link;
        this._alt = data.name;
        this._cardId = data._id;

        this._templateSelector = templateSelector;

        this._ownerCard = data.owner._id === currentUserId;
        this._currentUserId = currentUserId;
        this._likes = data.likes;
        this._likedByUs = data.likes.find((user) => user._id === currentUserId);

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleDeleteLike = handleDeleteLike;
        this._handleAddLike = handleAddLike;
    }

    _getElementFromTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    deleteCard() {
        this._element.remove();
    }

    _checkCardLikedByUs() {
        if (this._likedByUs) {
            this._likeButton.classList.add('element__like_active');
        }
    }
   
    toggleLike() {
        this._likeButton.classList.toggle('element__like_active');
    }

    handleLikesCount(res) {
        this._handleLikesCount.textContent = `${res.likes.length}`;
    }

    getElement() {
        this._element = this._getElementFromTemplate();

        this._cardPhoto = this._element.querySelector('.element__photo');
        this._cardPhoto.src = this._photo;
        this._cardPhoto.alt = this._name;

        this._cardTitle = this._element.querySelector('.element__title');
        this._cardTitle.textContent = this._name;

        this._deleteButton = this._element.querySelector('.element__delete');
        this._likeButton = this._element.querySelector('.element__like');

        this._handleLikesCount = this._element.querySelector('.element__like-count');
        this._handleLikesCount.textContent = this._likes.length;

        if (!this._ownerCard) {
            this._deleteButton.remove();
        }

        this._checkCardLikedByUs();
        this._addEventListeners();

        return this._element;
    }

    _addEventListeners() {
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._cardId);
        })

        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('element__like_active')) {
                this._handleDeleteLike(this._cardId);
              } else {
                this._handleAddLike(this._cardId);
            }
        })

        this._cardPhoto.addEventListener('click', () => {
            this._handleCardClick(this._name, this._photo)
        });
    } 
}
