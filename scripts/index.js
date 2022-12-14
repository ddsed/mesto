const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');


editButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('popup__opened');
});

function popupClosed() {
    popup.classList.remove('popup__opened');
}

closeButton.addEventListener("click", popupClosed);

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__item_el_name');
const descriptionInput = formElement.querySelector('.popup__item_el_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    popupClosed();
}

formElement.addEventListener('submit', handleFormSubmit);