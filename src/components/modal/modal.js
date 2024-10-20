export function openModal(popup) {
    popup.classList.add('popup_is-opened');

    window.addEventListener('keydown', escClose);
}

export function closeModal(popup) {
    const isOpened = popup.classList.contains('popup_is-opened');

    if (isOpened) {
        popup.classList.remove('popup_is-opened');

        window.removeEventListener('keydown', escClose);
    }
}

export function clickOutsideClose(event, popup) {
    if (event.target.classList.contains('popup')) {
        closeModal(popup);
    }
}

function escClose(event) {
    const openedModal = document.querySelector('.popup_is-opened');

    if (event.key === 'Escape' && openedModal) {
        closeModal(openedModal);
    }
}