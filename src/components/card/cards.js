import {imagePopup} from '../modal/constants/popup';

const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

export function createCard(name, link, removeCb, likeCb, openModalCb) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener('click', () => openModalCb(imagePopup, link, name));

    cardLikeButton.addEventListener('click', () => likeCb(cardLikeButton));

    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {removeCb(cardElement)});

    return cardElement;
}

export function prependCard(card) {
    cardsList.prepend(card);
}

export function appendCard(card) {
    cardsList.append(card);
}

export function likeCard(button) {
    button.classList.toggle('card__like-button_is-active');
}

export function removeCard(card) {
    card.remove();
}