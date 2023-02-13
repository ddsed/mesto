import { initialCards } from './initial-cards.js';
import Card from './Card.js';

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
  document.addEventListener('keydown', pressEscapeKey);
  popup.addEventListener('mousedown', clickOnOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', pressEscapeKey);
  popup.removeEventListener('mousedown', clickOnOverlay);
}

const pressEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const clickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
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


//ПР7

// Изначальные карточки
const config = {
  selectorCardsList: '.elements__grid-container',
  selectorTemplateCard: '.cards-template',
}

const cardsList = document.querySelector(config.selectorCardsList);


for (const item of initialCards) {
  const card = new Card(config.selectorTemplateCard, item);
  cardsList.append(card.getElement());
}


// Новые карточки
const formCreateNewCard = document.querySelector('.popup__form_type_add-card');
const newCardNameInput = formCreateNewCard.querySelector('.popup__item_el_name');
const newCardDescriptionInput = formCreateNewCard.querySelector('.popup__item_el_description');

const renderCard = (el) =>  {
  cardsList.prepend(createCard(el));
}

const createCard = (el) => {
  const card = new Card(config.selectorTemplateCard, el, openImageCloseView);
  return card.getElement();
}

const submitCardForm = (evt) => {
  evt.preventDefault();
  renderCard({name: newCardNameInput.value, link: newCardDescriptionInput.value});
  
  closePopup(popupAdd);
  evt.currentTarget.reset();

  const buttonSubmit = formCreateNewCard.querySelector('.popup__submit-button');

  buttonSubmit.classList.add('popup__submit-button_inactive');
  buttonSubmit.setAttribute('disabled', true);
}

formCreateNewCard.addEventListener('submit', submitCardForm);

//Большая картинка
const popupImage = document.querySelector('.popup_type_image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageTitle = popupImage.querySelector('.popup__title_type_image');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

export const openImageCloseView = (name, link) => {
  popupImagePhoto.alt = name;
  popupImagePhoto.src = link;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
};

function closePopupImage() {
  closePopup(popupImage);
}

buttonCloseImage.addEventListener('click', closePopupImage);

 /*
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

  renderCards(); */

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

