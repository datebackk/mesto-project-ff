const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

function createCard(name, link, removeCb) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCb.bind(this, cardElement));

    cardsList.append(cardElement);
}

function removeCard(card) {
    card.remove();
}

initialCards.forEach(({name, link}) => {
    createCard(name, link, removeCard);
})
