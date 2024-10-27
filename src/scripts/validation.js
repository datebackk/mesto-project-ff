export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

export const enableValidation = validationConfig => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach(formElement => {
        setEventListeners(
            formElement,
            validationConfig.inputSelector,
            validationConfig.inputErrorClass,
            validationConfig.errorClass,
            validationConfig.submitButtonSelector,
            validationConfig.inactiveButtonClass
        );
    });
};

export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);

    inputList.forEach(inputElement => {
        hideInputError(
            formElement,
            inputElement,
            validationConfig.inputErrorClass,
            validationConfig.errorClass
        );

        inputElement.setCustomValidity('');
    });
};

const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(inputErrorClass);

    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

const checkInputValidity = (
    formElement,
    inputElement,
    inputErrorClass,
    errorClass
) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            inputErrorClass,
            errorClass
        );
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (
    formElement,
    inputSelector,
    inputErrorClass,
    errorClass,
    submitButtonSelector,
    inactiveButtonClass
) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(
                formElement,
                inputElement,
                inputErrorClass,
                errorClass
            );

            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
};