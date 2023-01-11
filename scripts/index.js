const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__item_el_name');
const descriptionInput = formElement.querySelector('.popup__item_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function popupOpened(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function popupClosed() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    popupClosed();
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);
formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
    {
      name: 'Эльбрус',
      link: './images/elbrus.jpeg'
    },
    {
      name: 'Италия',
      link: './images/Italy.jpeg'
    },
    {
      name: 'Норвегия',
      link: './images/norway.jpeg'
    },
    {
      name: 'Байкал',
      link: './images/baikal.jpeg'
    },
    {
      name: 'Камчатка',
      link: './images/kamchatka.jpeg'
    },
    {
      name: 'Архыз',
      link: './images/arkhyz.jpeg'
    }
  ];

  const cardsContainer = document.querySelector('.elements__grid-container');
  const cardsTemplate = document.querySelector('.cards-template').content.querySelector('.element');

  function createCard({ name, link }) {
    const card = cardsTemplate.cloneNode(true);
    const cardName = card.querySelector('.element__title');
    cardName.textContent = name;
    const cardImage = card.querySelector('.element__photo');
    cardImage.src = link; 

    return card;
  }

  function renderCards() {
    initialCards.forEach(item => {
        const cardHtml = createCard(item);
        cardsContainer.append(cardHtml);
    });
  }

  renderCards();

  const addButton = document.querySelector('.profile__add-button');
  const popupAdd = document.querySelector('.popup-add');
  const closeButtonPopupAdd = popupAdd.querySelector('.popup-add__close-button');

  function popupAddOpened(evt) {
    evt.preventDefault();
    popupAdd.classList.add('popup-add_opened');
  }

  function popupAddClosed() {
    popupAdd.classList.remove('popup-add_opened');
  }

  addButton.addEventListener('click', popupAddOpened);
  closeButtonPopupAdd.addEventListener('click', popupAddClosed);

