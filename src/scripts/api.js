const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: '64c7217f-e8f1-47a2-9b25-31eb660c4ad0',
        'Content-Type': 'application/json',
    },
};

const getResponse = response => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(response);
};

export const getCurrentUser = async () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers,
    }).then(getResponse);
};

export const getCards = async () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers,
    }).then(getResponse);
};

export const getInitialInfo = async () => {
    return Promise.all([getCurrentUser(), getCards()]);
};

export const editProfile = async (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name,
            about,
        }),
    }).then(getResponse);
};

export const postCard = async (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name,
            link,
        }),
    }).then(getResponse);
};

export const addLike = async cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    }).then(getResponse);
};

export const deleteLike = async cardId => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(getResponse);
};

export const deleteCard = async cardId => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    }).then(getResponse);
};

export const updateAvatar = async avatar => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar,
        }),
    }).then(getResponse);
};