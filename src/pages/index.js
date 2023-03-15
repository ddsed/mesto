import './index.css'; 
//import { initialCards } from '../utils/initial-cards.js';
import { configValidation } from '../utils/config-validation.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Валидация
const popupAddNewCard = document.querySelector('.popup_type_add-card');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

const validationProfile = new FormValidator(configValidation, popupEditProfile);
const validationNewCard = new FormValidator(configValidation, popupAddNewCard);

validationProfile.enableValidation();
validationNewCard.enableValidation();

/*
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


//Изначальные карточки 8ПР
const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (item) => {
    const initialCard = createCard(item);
    cardList.addItem(initialCard);
  },
}, config.selectorCardsList);

cardList.renderItems();

//Большая картинка
const popupWithImage = new PopupWithImage('.popup_type_image');

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
const infoAddCardPopup = new PopupWithForm('.popup_type_add-card', handleSubmitForm);
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
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription:'.profile__description',
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
const infoEditProfilePopup = new PopupWithForm('.popup_type_edit-profile', editProfileData);

function editProfileData(data) {
  userInfo.setUserInfo(data = {profileName: nameInput.value, profileDescription: descriptionInput.value});
  infoEditProfilePopup.close();
};

infoEditProfilePopup.setEventListeners();
*/

//9ПР

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: "25ba17d7-1766-40fc-b636-0f2523c53d74",
    "Content-Type": "application/json"
  }
});

//КАРТОЧКИ
//Изначальные карточки
const config = {
  selectorCardsList: '.elements__grid-container',
  selectorTemplateCard: '.cards-template',
}

//Создание карточки
function createCard(item) {
  const card = new Card(item, config.selectorTemplateCard, handleCardClick);
  return card.getElement();
}

const cardList = new Section({
  renderer: (item) => {
    const initialCard = createCard(item);
    cardList.addItem(initialCard);
  },
}, config.selectorCardsList);

api.getInitialCards().then((items) => {
  cardList.renderItems(items);
})

//Большая картинка
const popupWithImage = new PopupWithImage('.popup_type_image');

popupWithImage.setEventListeners();

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
};

//ПРОФИЛЬ
let userId;

//Попап редактирования профиля
//Изначальные данные
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription:'.profile__description',
});

//Открытие
const formEditProfile = popupEditProfile.querySelector('.popup__form_type_edit-profile');
const nameInput = formEditProfile.querySelector('.popup__item_el_name');
const descriptionInput = formEditProfile.querySelector('.popup__item_el_description');

function openProfilePopup() {
  const info = userInfo.getUserInfo();
  nameInput.value = info.profileName;
  descriptionInput.value = info.profileDescription;

  validationProfile.resetValidation();

  infoEditProfilePopup.open();
}

const buttonEdit = document.querySelector('.profile__edit-button');
buttonEdit.addEventListener('click', openProfilePopup);

//Внесение инфоромации в попап профиля
const infoEditProfilePopup = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmitForm: (data) => {
    api.editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

infoEditProfilePopup.setEventListeners();

Promise.all([api.getUserInfoApi()])
  .then(([user]) => {
    userInfo.setUserInfo(user);
    userId = user._id;
  })
  .catch((err) => {
    console.log(err);
  })
