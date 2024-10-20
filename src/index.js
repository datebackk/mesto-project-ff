import './pages/index.css';
import {closeModal, openImageModal, openModal} from './components/modal/modal';
import {initialCards} from './components/card/constants/initial-cards';
import {appendCard, createCard, likeCard, prependCard, removeCard} from "./components/card/cards";
import {addCardPopup, profileEditPopup} from './components/modal/constants/popup';

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');

const profileForm = profileEditPopup.querySelector('.popup__form[name=edit-profile]');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');

profileEditButton.addEventListener('click', () => {
    openModal(profileEditPopup);

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileDescription.textContent;
});
profileForm.addEventListener('submit', editProfileFormSubmit);

function editProfileFormSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;

    closeModal();
}


const addCardButton = document.querySelector('.profile__add-button');

const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardImageLinkInput = addCardForm.querySelector('.popup__input_type_url');

addCardButton.addEventListener('click', () => {
    addCardForm.reset();
    openModal(addCardPopup)
});
addCardForm.addEventListener('submit', addCardFormSubmit);

function addCardFormSubmit(event) {
    event.preventDefault();

    prependCard(createCard(
        cardNameInput.value,
        cardImageLinkInput.value,
        removeCard,
        likeCard,
        openImageModal,
    ));

    closeModal();

    addCardForm.reset();
}

initialCards.forEach(({name, link}) => {
    appendCard(createCard(name, link, removeCard, likeCard, openImageModal));
})