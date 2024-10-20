import './pages/index.css';
import {clickOutsideClose, closeModal, openModal} from './components/modal/modal';
import {createCard, likeCard, removeCard} from './components/card/cards';
import {
    addCardPopup,
    imagePopup,
    imagePopupImageCaption,
    imagePopupImage,
    profileEditPopup, popups
} from './components/modal/constants';
import {cardsList, initialCards} from './components/card/constants';

popups.forEach(popup => {
    popup.addEventListener('mousedown', (event) => clickOutsideClose(event, popup));

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
})

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');

const profileForm = profileEditPopup.querySelector('.popup__form[name=edit-profile]');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');

profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileDescription.textContent;

    openModal(profileEditPopup);
});
profileForm.addEventListener('submit', editProfileFormSubmit);

function editProfileFormSubmit(event) {
    event.preventDefault();

    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileJobInput.value;

    closeModal(profileEditPopup);
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

    const name = cardNameInput.value;
    const link = cardImageLinkInput.value;

    prependCard(createCard(
        name,
        link,
        removeCard,
        likeCard,
        () => openImageModal(link, name),
    ));

    closeModal(addCardPopup);

    addCardForm.reset();
}

export function openImageModal(link, description) {
    imagePopupImage.src = link;
    imagePopupImage.alt = description;

    imagePopupImageCaption.textContent = description;

    openModal(imagePopup);
}

export function prependCard(card) {
    cardsList.prepend(card);
}

export function appendCard(card) {
    cardsList.append(card);
}

initialCards.forEach(({name, link}) => {
    appendCard(createCard(name, link, removeCard, likeCard, () => openImageModal(link, name)));
})