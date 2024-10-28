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

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  }).then(handleResponse);
};

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
    .then(handleResponse);
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
  .then(handleResponse);
};

// запрос для удаления карточки с сервера 

export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponse);
};

// API запрос для добавления лайка

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(handleResponse);
};

// API запрос для удаления лайка

export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
 .then(handleResponse);
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
  .then(handleResponse);
}