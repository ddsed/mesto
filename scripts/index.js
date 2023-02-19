import { initialCards } from './initial-cards.js';
import Card from './Card.js';
import { FormValidator, configValidation } from './FormValidator.js';

// Редактирование профиля
const buttonEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const closeButtons = document.querySelectorAll('.popup__close-button');
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
    validationProfile.resetValidation();

    openPopup(popupEditProfile);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    closePopup(popupEditProfile);
}

buttonEdit.addEventListener('click', openProfilePopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


//ПР7

// Новые карточки
const formCreateNewCard = document.querySelector('.popup__form_type_add-card');
const newCardNameInput = formCreateNewCard.querySelector('.popup__item_el_name');
const newCardDescriptionInput = formCreateNewCard.querySelector('.popup__item_el_description');

const renderCard = (el) =>  {
  cardsList.prepend(createCard(el));
}

const createCard = (el) => {
  const card = new Card(config.selectorTemplateCard, el, handleCardClick);
  return card.getElement();
}

const submitCardForm = (evt) => {
  evt.preventDefault();
  renderCard({name: newCardNameInput.value, link: newCardDescriptionInput.value});
  
  closePopup(popupAdd);
  evt.currentTarget.reset();
}

formCreateNewCard.addEventListener('submit', submitCardForm);

//Большая картинка
const popupImage = document.querySelector('.popup_type_image');
const popupImagePhoto = popupImage.querySelector('.popup__photo');
const popupImageTitle = popupImage.querySelector('.popup__title_type_image');

function handleCardClick(name, link) {
  popupImagePhoto.src = link;
  popupImagePhoto.alt = name;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
}

function closePopupImage() {
  closePopup(popupImage);
}

//Валидация
const popupAddNewCard = document.querySelector('.popup_type_add-card');

const validationProfile = new FormValidator(configValidation, popupEditProfile);
const validationNewCard = new FormValidator(configValidation, popupAddNewCard);

validationProfile.enableValidation();
validationNewCard.enableValidation();

// Открытие и закрытие попапа добавления новых карточек
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_add-card');

function openAddPopup(evt) {
  evt.preventDefault();

  validationNewCard.resetValidation();

  openPopup(popupAdd);
}

function closeAddPopup() {
  closePopup(popupAdd);
}

buttonAdd.addEventListener('click', openAddPopup);

// Изначальные карточки
const config = {
  selectorCardsList: '.elements__grid-container',
  selectorTemplateCard: '.cards-template',
}

const cardsList = document.querySelector(config.selectorCardsList);

for (const item of initialCards) {
  const card = createCard(item);
  cardsList.append(card);
}