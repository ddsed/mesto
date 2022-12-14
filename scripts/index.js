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