import './index.css'; 
import { configValidation, 
  config, 
  popupAddNewCard, 
  popupEditProfile, 
  popupAvatar, 
  buttonAdd, 
  submitButtonCard, 
  initialButtonCardText,
  nameInput,
  descriptionInput,
  buttonEdit,
  submitButtonProfile,
  initialButtonProfileText,
  editAvatarButton,
  submitButtonAvatar,
  initialButtonAvatarText } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirmDelete from '../components/PopupConfirmDelete.js';


//9ПР
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: "25ba17d7-1766-40fc-b636-0f2523c53d74",
    "Content-Type": "application/json"
  }
});

//Валидация
const validationProfile = new FormValidator(configValidation, popupEditProfile);
const validationNewCard = new FormValidator(configValidation, popupAddNewCard);
const validationAvatar = new FormValidator(configValidation, popupAvatar);

validationProfile.enableValidation();
validationNewCard.enableValidation();
validationAvatar.enableValidation();


//КАРТОЧКИ
//Изначальные карточки
const cardList = new Section({
  renderer: (item) => {
    const initialCard = createCard(item, currentUserId);
    cardList.addItemReverse(initialCard);
  },
}, config.selectorCardsList);

api.getInitialCards().then((items) => {
  cardList.renderItems(items);
})

//Создание карточки
const createCard = (item, currentUserId) => {
  const card = new Card(item, config.selectorTemplateCard, currentUserId, {
    handleCardClick: (name, link) =>{
      popupWithImage.open(name, link);
    },

    handleDeleteClick: (cardId) => {
      popupConfirmDelete.open();
      popupConfirmDelete.handleDelete(() => {
        api.deleteCardApi(cardId)
        .then((res) => {
          card.deleteCard(res);
          popupConfirmDelete.close();
        })
        .catch((err) => {
          console.log(err);
        });
      });
    },

    handleAddLike: (cardId) => {
      api.addLike(cardId)
      .then((res) => {
        card.toggleLike();
        card.handleLikesCount(res);
      })
      .catch((err) => {
        console.log(err);
      });
    },

    handleDeleteLike: (cardId) => {
      api.deleteLike(cardId) 
      .then((res) => {
        card.toggleLike();
        card.handleLikesCount(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  })
  return card.getElement();
}

//Большая картинка
const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

//Попап добавления новых карточек

//Открытие
function openAddPopup(evt) {
  evt.preventDefault();
  validationNewCard.resetValidation();

  infoAddCardPopup.open();
};

buttonAdd.addEventListener('click', openAddPopup);

//Внесение информации новой карточки в попап
const infoAddCardPopup = new PopupWithForm('.popup_type_add-card', {
  handleSubmitForm: (data) => {
    submitButtonCard.textContent = 'Сохранение...';
    return api.createNewCard(data)
      .then((data) => {
        cardList.addItem(createCard(data, currentUserId));
        infoAddCardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonCard.textContent = initialButtonCardText;
      })
  },
});

infoAddCardPopup.setEventListeners();

//Попап удаления карточки
const popupConfirmDelete = new PopupConfirmDelete('.popup_type_delete');
popupConfirmDelete.setEventListeners();






//ПРОФИЛЬ
let currentUserId;

//Попап редактирования профиля
//Изначальные данные
const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileDescription:'.profile__description',
  profileAvatar: '.profile__avatar',
});

//Открытие попапа редактирования профиля
function openProfilePopup() {
  const info = userInfo.getUserInfo();
  nameInput.value = info.profileName;
  descriptionInput.value = info.profileDescription;

  validationProfile.resetValidation();

  infoEditProfilePopup.open();
}

buttonEdit.addEventListener('click', openProfilePopup);

//Внесение инфоромации в попап редактирования профиля
const infoEditProfilePopup = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmitForm: (data) => {
    submitButtonProfile.textContent = 'Сохранение...';
    return api.editUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        infoEditProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonProfile.textContent = initialButtonProfileText;
      })
  },
});

infoEditProfilePopup.setEventListeners();

//Попап редактирования аватара
//Открытие попапа редактирования аватара
editAvatarButton.addEventListener("click", () => {
  validationAvatar.resetValidation();
  avatarPopup.open();
});

//Внесение инфоромации в попап редактирования аватара
const avatarPopup = new PopupWithForm('.popup_type_avatar', {
  handleSubmitForm: (avatar) => {
    submitButtonAvatar.textContent = 'Сохранение...';
    return api.changeAvatar(avatar)
      .then((data) => {
        userInfo.changeAvatarInfo(data);
        avatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButtonAvatar.textContent = initialButtonAvatarText;
      });
  },
});

avatarPopup.setEventListeners();

Promise.all([api.getUserInfoApi()], [api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    currentUserId = user._id;
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  })
