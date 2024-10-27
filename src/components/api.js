import { renderCard, showProfileInfo, showAvatar } from "..";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-24',
  headers: {
    authorization: '23c26a27-ae66-4330-825e-86f0631ae29b',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Функция для получения информации о пользователе

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  }).then(handleResponse);
};

// Функция для получения карточек

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(handleResponse);
};

// Загрука данных пользователя и карточки одновременно
  
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    console.log(userData, cards);
    showAvatar(userData.avatar);
    showProfileInfo(userData.name, userData.about)
    document.querySelector('.profile__image').classList.remove('hidden');
    document.querySelector('.profile__title').classList.remove('hidden');
    document.querySelector('.profile__description').classList.remove('hidden');
    const userId = userData._id;
    cards.forEach((card) => {
      renderCard(card, userId);
    });
  })
  .catch((error) => console.error("Ошибка загрузки данных:", error));

// запрос для изменения информации в профиле

export const editProfileData = (nameValue, jobValue) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameValue,
      about: jobValue,
    })
  })
    .then(handleResponse)
    .catch((error) => console.error("Ошибка:", error));
};

// запрос для добавления карточки на сервер

export const addNewCard = (newPlace, newLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newPlace,
      link: newLink,
    })
  })
  .then(handleResponse)
  .catch((error) => console.error("Ошибка:", error));
};

// запрос для удаления карточки с сервера 

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse)
    .catch((error) => console.error("Ошибка при удалении карточки:", error));
};

// API запрос для добавления лайка

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse)
  .catch((error) => console.error("Ошибка:", error));
};

// API запрос для удаления лайка

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
 .then(handleResponse)
 .catch((error) => console.error("Ошибка:", error));
};

// запрос для изменения аватара

export const changeAvatar = (avatarNew) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarNew
    })
  })
  .then(handleResponse)
  .catch((error) => console.error("Ошибка:", error));
}