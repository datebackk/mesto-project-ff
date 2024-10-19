const cardTemplate = document.querySelector('#card-template').content;

const cardsList = document.querySelector('.places__list');

function createCard(name, link, removeCb) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCb.bind(this, cardElement));

    return cardElement;
}

function removeCard(card) {
    card.remove();
}

initialCards.forEach(({name, link}) => {
    cardsList.append(createCard(name, link, removeCard));
})
