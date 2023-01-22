// Редактирование профиля
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseProfile = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const nameInput = formEditProfile.querySelector('.popup__item_el_name');
const descriptionInput = formEditProfile.querySelector('.popup__item_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openProfilePopup() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;

    openPopup(popupEditProfile);
}

function closeProfilePopup() {
  closePopup(popupEditProfile);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(popupEditProfile);
}

buttonEdit.addEventListener('click', openProfilePopup);
buttonCloseProfile.addEventListener('click', closeProfilePopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// Изначальные карточки
  const cardsContainer = document.querySelector('.elements__grid-container');
  const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.element');
  const popupImage = document.querySelector('.popup_type_image');
  const buttonCloseImage = popupImage.querySelector('.popup__close-button');
  const popupImagePhoto = popupImage.querySelector('.popup__photo');
  const popupImageTitle = popupImage.querySelector('.popup__title_type_image');

  function createCard({ name, link }) {
    const card = cardsTemplate.cloneNode(true);
    const cardName = card.querySelector('.element__title');
    cardName.textContent = name;

    const cardImage = card.querySelector('.element__photo');
    cardImage.src = link; 
    cardImage.alt = name; 

    // Лайк
    const buttonLike = card.querySelector('.element__like');
    const likeCard = (evt) => {
      evt.target.classList.toggle('element__like_active');
    }

    buttonLike.addEventListener('click', likeCard);

    // Удаление
    const buttonDelete = card.querySelector('.element__delete');
    const deleteCard = () => {
      card.remove();
    }

    buttonDelete.addEventListener('click', deleteCard);

    // Просмотр фото карточек
    function openImageCloseView() {
      openPopup(popupImage);
      popupImagePhoto.src = link;
      popupImagePhoto.alt = name; 
      popupImageTitle.textContent = name;
    }

    cardImage.addEventListener('click', openImageCloseView);

    return card;
  }

  // Закрытие фото карточек
  function closePopupImage() {
    closePopup(popupImage);
  }

  buttonCloseImage.addEventListener('click', closePopupImage);

  // Рендер карт
  function renderCards() {
    initialCards.forEach(item => {
        const cardHtml = createCard(item);
        cardsContainer.append(cardHtml);
    });
  }

  renderCards();

// Открытие и закрытие попапа добавления новых карточек
  const buttonAdd = document.querySelector('.profile__add-button');
  const popupAdd = document.querySelector('.popup_type_add-card');
  const buttonCloseCard = popupAdd.querySelector('.popup__close-button');

 function openAddPopup(evt) {
    evt.preventDefault();

    openPopup(popupAdd);
  }

  function closeAddPopup() {
    closePopup(popupAdd);
  }

  buttonAdd.addEventListener('click', openAddPopup);
  buttonCloseCard.addEventListener('click', closeAddPopup);


// Создание новых карточек
  const formCreateNewCard = document.querySelector('.popup__form_type_add-card');
  const newCardNameInput = formCreateNewCard.querySelector('.popup__item_el_name');
  const newCardDescriptionInput = formCreateNewCard.querySelector('.popup__item_el_description');
  
  function createNewCard(evt) {
    evt.preventDefault();
    const newCard = createCard({name: newCardNameInput.value, link: newCardDescriptionInput.value});
    cardsContainer.prepend(newCard);

    closePopup(popupAdd);
    evt.currentTarget.reset();
  }

  formCreateNewCard.addEventListener('submit', createNewCard);

  //СПРИНТ 6

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
