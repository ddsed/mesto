import './index.css'; 
import { initialCards } from '../utils/initial-cards.js';
import Card from '../components/Card.js';
import { FormValidator, configValidation } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


//Валидация
const popupAddNewCard = document.querySelector('.popup_type_add-card');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const validationProfile = new FormValidator(configValidation, popupEditProfile);
const validationNewCard = new FormValidator(configValidation, popupAddNewCard);

validationProfile.enableValidation();
validationNewCard.enableValidation();

//Карточки
const config = {
  selectorCardsList: '.elements__grid-container',
  selectorTemplateCard: '.cards-template',
}

//Создание карточки
function createCard(item) {
  const card = new Card(item, config.selectorTemplateCard, handleCardClick);
  return card.getElement();
}

//Изначальные карточки
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const initialCard = createCard(item);
    cardList.addItem(initialCard);
  },
}, config.selectorCardsList);

cardList.renderItems(initialCards.reverse());

//Большая картинка
const popupImage = document.querySelector('.popup_type_image');
const popupWithImage = new PopupWithImage(popupImage);

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};


//Попап добавления новых карточек
//Открытие
function openAddPopup(evt) {
  evt.preventDefault();
  validationNewCard.resetValidation();

  infoAddCardPopup.open();
};

const buttonAdd = document.querySelector('.profile__add-button');
buttonAdd.addEventListener('click', openAddPopup);

//Внесение информации новой карточки в попап
const infoAddCardPopup = new PopupWithForm(popupAddNewCard, handleSubmitForm);
const formCreateNewCard = document.querySelector('.popup__form_type_add-card');
const newCardNameInput = formCreateNewCard.querySelector('.popup__item_el_name');
const newCardDescriptionInput = formCreateNewCard.querySelector('.popup__item_el_description');

function handleSubmitForm(data) {
  cardList.addItem(createCard(data = {name: newCardNameInput.value, link: newCardDescriptionInput.value}));
  infoAddCardPopup.close();
};

infoAddCardPopup.setEventListeners();


//Попап редактирования профиля
//Изначальные данные
const userName = document.querySelector('.profile__name');
const userDescription = document.querySelector('.profile__description');

const userInfo = new UserInfo({
  profileName: userName,
  profileDescription: userDescription,
});

//Открытие
const formEditProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const nameInput = formEditProfile.querySelector('.popup__item_el_name');
const descriptionInput = formEditProfile.querySelector('.popup__item_el_description');

function openProfilePopup() {
  const info = userInfo.getUserInfo()
  nameInput.value = info.profileName;
  descriptionInput.value = info.profileDescription;

  validationProfile.resetValidation();

  infoEditProfilePopup.open();
}

const buttonEdit = document.querySelector('.profile__edit-button');
buttonEdit.addEventListener('click', openProfilePopup);

//Внесение инфоромации в попап профиля
const infoEditProfilePopup = new PopupWithForm(popupEditProfile, editProfileData);

function editProfileData(data) {
  userInfo.setUserInfo(data = {profileName: nameInput.value, profileDescription: descriptionInput.value});
  infoEditProfilePopup.close();
};

infoEditProfilePopup.setEventListeners();





/*
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
*/
