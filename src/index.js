import './pages/index.css';
import {clickOutsideClose, closeModal, openModal} from './components/modal/modal';
import {createCard, likeCard, removeCard} from './components/card/cards';
import {
    addCardPopup,
    cardImagePopup,
    imagePopupImageCaption,
    imagePopupImage,
    profileEditPopup, popups, profileImagePopup
} from './components/modal/constants';
import {cardsList} from './components/card/constants';
import {editProfile, getInitialInfo, postCard, updateAvatar} from './scripts/api';
import {clearValidation, enableValidation, validationConfig} from './scripts/validation';
import {patchSubmitButtonLoadingState} from './scripts/utils';

let currentUserId;

popups.forEach(popup => {
    popup.addEventListener('mousedown', (event) => clickOutsideClose(event, popup));

    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closeModal(popup));
});

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatarButton = document.querySelector('.profile__image-cover');
const profileImage = document.querySelector('.profile__image');

const profileEditButton = document.querySelector('.profile__edit-button');

const profileAvatarForm = profileImagePopup.querySelector('.popup__form[name=edit-avatar]');
const profileAvatarInput = profileAvatarForm.querySelector('.popup__input_type_url');

const profileForm = profileEditPopup.querySelector('.popup__form[name=edit-profile]');
const profileNameInput = profileForm.querySelector('.popup__input_type_name');
const profileJobInput = profileForm.querySelector('.popup__input_type_description');

profileAvatarButton.addEventListener('click', () => {
    clearValidation(profileAvatarForm, validationConfig);

    profileAvatarForm.reset();

    openModal(profileImagePopup);
});

profileAvatarForm.addEventListener('submit', editProfileAvatarFormSubmit)

function editProfileAvatarFormSubmit(event) {
    event.preventDefault();

    const profileAvatarLink = profileAvatarInput.value;

    patchSubmitButtonLoadingState(true, profileImagePopup.querySelector(validationConfig.submitButtonSelector));

    updateAvatar(profileAvatarLink)
        .then(({avatar}) => {
            profileImage.style.backgroundImage = `url('${avatar}')`;

            closeModal(profileImagePopup);
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            patchSubmitButtonLoadingState(false, profileImagePopup.querySelector(validationConfig.submitButtonSelector));
        });
}


profileEditButton.addEventListener('click', () => {
    clearValidation(profileForm, validationConfig);

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileDescription.textContent;

    openModal(profileEditPopup);
});
profileForm.addEventListener('submit', editProfileFormSubmit);

function editProfileFormSubmit(event) {
    event.preventDefault();

    const name = profileNameInput.value;
    const job = profileJobInput.value;

    patchSubmitButtonLoadingState(true, profileEditPopup.querySelector(validationConfig.submitButtonSelector));

    editProfile(name, job)
        .then(({name, about}) => {
            profileTitle.textContent = name;
            profileDescription.textContent = about;

            closeModal(profileEditPopup);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            patchSubmitButtonLoadingState(false, profileEditPopup.querySelector(validationConfig.submitButtonSelector));
        });
}


const addCardButton = document.querySelector('.profile__add-button');

const addCardForm = addCardPopup.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardImageLinkInput = addCardForm.querySelector('.popup__input_type_url');

addCardButton.addEventListener('click', () => {
    openModal(addCardPopup);
});
addCardForm.addEventListener('submit', addCardFormSubmit);

function addCardFormSubmit(event) {
    event.preventDefault();

    const name = cardNameInput.value;
    const link = cardImageLinkInput.value;

    patchSubmitButtonLoadingState(true, addCardPopup.querySelector(validationConfig.submitButtonSelector));

    postCard(name, link)
        .then(cardData => {
            prependCard(createCard(
                cardData,
                currentUserId,
                removeCard,
                likeCard,
                () => openImageModal(link, name),
            ));

            closeModal(addCardPopup);

            addCardForm.reset();

            clearValidation(addCardForm, validationConfig);
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            patchSubmitButtonLoadingState(false, addCardPopup.querySelector(validationConfig.submitButtonSelector));
        });
}

export function openImageModal(link, description) {
    imagePopupImage.src = link;
    imagePopupImage.alt = description;

    imagePopupImageCaption.textContent = description;

    openModal(cardImagePopup);
}

export function prependCard(card) {
    cardsList.prepend(card);
}

export function appendCard(card) {
    cardsList.append(card);
}

getInitialInfo()
    .then(([currentUser, cards]) => {
        currentUserId = currentUser._id;

        profileTitle.textContent = currentUser.name;
        profileDescription.textContent = currentUser.about;
        profileImage.style.backgroundImage = `url(${currentUser.avatar})`;

        cards.forEach(cardData => {
            appendCard(createCard(cardData, currentUserId, removeCard, likeCard, () => openImageModal(cardData.link, cardData.name)));
        });
    })
    .catch(error => {
        console.log(error);
    });

enableValidation(validationConfig);