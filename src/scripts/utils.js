export const patchSubmitButtonLoadingState = (isLoading, button) => {
    button.disabled = isLoading;

    if (isLoading) {
        button.classList.add('popup__button_loading');
        button.textContent = 'Сохранение...';

        return;
    }

    button.classList.remove('popup__button_loading');
    button.textContent = 'Сохранить';
};