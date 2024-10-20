export function openModal(popup) {
    popup.classList.add('popup_is-opened');

    const closeButton = popup.querySelector('.popup__close');

    closeButton.addEventListener('click', closeModal);
    popup.addEventListener('mousedown', clickOutsideClose);

    window.addEventListener('keydown', escClose);
}

export function closeModal() {
    const openedModal = document.querySelector('.popup_is-opened');

    if (openedModal) {
        openedModal.classList.remove('popup_is-opened');

        window.removeEventListener('keydown', escClose);
    }
}

export function openImageModal(popup, link, description) {
    const image = popup.querySelector('.popup__image');
    const caption = popup.querySelector('.popup__caption');

    image.setAttribute('src', link);
    image.setAttribute('alt',description);

    caption.textContent = description;

    openModal(popup);
}

function clickOutsideClose(event) {
    if (event.target.classList.contains('popup')) {
        closeModal();
    }
}

function escClose(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}