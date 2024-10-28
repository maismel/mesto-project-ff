// Импорт файлов

import './pages/index.css';
import { openModal, closeModal } from './components/modal.js';
import { createCard, deleteCard } from './components/card.js';
import { enableValidation } from './scripts/validation.js';

import { deleteCardFromServer, editProfileData, addNewCard, likeCard, unlikeCard, changeAvatar, getInitialCards, getUserData } from './components/api.js';

// DOM узлы

const cardList = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const modalEdit = document.querySelector('.popup_type_edit');
const modals = document.querySelectorAll('.popup')
const buttonsClose = document.querySelectorAll('.popup__close');
const modalCard = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const formCard = document.forms['new-place'];
const placeInput = formCard.elements['place-name'];
const linkInput = formCard.elements.link;
const imageModal = document.querySelector('.popup_type_image');
const image = document.querySelector('.popup__image');
const description = document.querySelector('.popup__caption');
const modalSubmit = document.querySelector('.popup_type_submit');
const buttonSubmitDelete = document.querySelector('.popup__button__submit-delete');
const profileImage = document.querySelector('.profile__image');
const modalAvatar = document.querySelector('.popup_type_edit-profile');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const formAvatar = document.forms['new-avatar'];
const avatarInput = formAvatar.elements.avatarLink;
const formConfirm = document.forms['submit-delete'];

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
  
// Открытие и закрытие модальных окон

buttonEdit.addEventListener('click', () => openModalEdit());

buttonAdd.addEventListener('click', () => openModal(modalCard));

buttonsClose.forEach(button => {
    button.addEventListener('click', function() {
        const popup = this.closest('.popup');
        if (popup) {
            closeModal(popup);
        }
    });
});

// Добавление плавности при открытии и закрытии 

modals.forEach(function(modal) {
    modal.classList.add('popup_is-animated');
})

// Функция открытия картинки из карточки 

function openImage(cardImage) {
    openModal(imageModal);
    image.src = cardImage.src;
    description.alt = cardImage.alt;
    description.textContent = cardImage.alt;
}

// Функция открытия модального окна редактировать 

function openModalEdit() {
    openModal(modalEdit);
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

// Функции для изменения текста при сохранении 

const changeButtonState = (button, text) => {
    button.textContent = text; 
    button.disabled = true; 
}

const restoreButtonState = (button, originalText) => {
    button.textContent = originalText;
    button.disabled = false; 
}

// Эта функция помогает вывести загруженные с сервера имя и описание

export const showProfileInfo = (nameNew, jobNew) => {
    const nameDefault = document.querySelector('.profile__title');
    const jobDefault = document.querySelector('.profile__description');
    
    nameDefault.textContent = nameNew;
    jobDefault.textContent = jobNew;
}

// Эта функция помогает вывести загруженную с сервера аватарку

export const showAvatar = (avatarLink) => {
    const profileImage = document.querySelector('.profile__image');
    profileImage.style.backgroundImage = `url(${avatarLink})`;
}

// Открывает модальное окно для изменения аватарки

profileImage.addEventListener('click', () => {
    openModal(modalAvatar);
})

formAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const profileImage = document.querySelector('.profile__image');
    const newAvatarUrl = avatarInput.value;
    const submitButton = evt.submitter;  // Получаем кнопку, на которой произошло событие

    changeButtonState(submitButton, 'Сохранение...');
    submitButton.disabled = true;

    changeAvatar(newAvatarUrl)
    .then(() => {
        profileImage.style.backgroundImage = `url(${newAvatarUrl})`; 
        closeModal(modalAvatar);
        formAvatar.reset();
    })
    .catch((error) => {
        console.error('Ошибка при сохранении аватара:', error);
    })
    .finally(() => {
        restoreButtonState(submitButton, 'Сохранить'); 
        submitButton.disabled = false;
    });
});

// С помощью этой функции выводятся карточки на страинцу

export const renderCard = (card, userId) => { 
    cardList.append(createCard({ 
        card, 
        userId,  
        handleDeleteCard,
        handleLike: (evt, cardId, cardElement) => { 
            const eventTarget = evt.target; 
            const likeCountElement = cardElement.querySelector('.card__like-number'); 
            if (!eventTarget.classList.contains('card__like-button_is-active')) { 
                likeCard(cardId) 
                .then((res => { 
                    likeCountElement.textContent = res.likes.length; 
                    eventTarget.classList.add('card__like-button_is-active'); 
                })) 
            } else { 
                unlikeCard(cardId) 
                .then((res => { 
                    likeCountElement.textContent = res.likes.length; 
                    eventTarget.classList.remove('card__like-button_is-active'); 
                })) 
                .catch((error) => {
                    console.error('Ошибка при удалении лайка:', error);
                });
            } 
        }, 
        handleOpenImage: (cardImage) => { 
            openImage(cardImage); 
        } 
    })); 
}; 


// Эта функция подтверждает изменение информации в профиле

function submitEditProfileForm(evt) { 
    evt.preventDefault(); 
 
    const submitButton = evt.submitter; 
 
    changeButtonState(submitButton, 'Сохранение...'); 
    editProfileData(nameInput.value, jobInput.value) 
    .then(() => { 
        name.textContent = nameInput.value; 
        job.textContent = jobInput.value; 
 
        closeModal(modalEdit); 
        formEditProfile.reset(); 
    }) 
    .catch((error) => { 
        console.error('Ошибка при сохранении информации профиля:', error); 
    }) 
    .finally(() => { 
        restoreButtonState(submitButton, 'Сохранить'); 
    }); 
} 
 
formProfile.addEventListener('submit', submitEditProfileForm);

// Переменные для хранения текущей карточки и ID при удалении
let currentCardElement = null;
let currentCardId = null;

// Функция обработки отправки формы подтверждения удаления
const handleConfirmSubmit = (evt) => {
    evt.preventDefault();
    const submitButton = evt.submitter; 
    changeButtonState(submitButton, 'Удаление...');
    deleteCardFromServer(currentCardId)
        .then(() => { 
            deleteCard(currentCardElement);
            closeModal(modalSubmit);
        })
        .catch((error) => {
            console.error('Ошибка при удалении карточки:', error);
        })
        .finally(() => { 
            restoreButtonState(submitButton, 'Да'); 
        }); 
};

formConfirm.addEventListener('submit', handleConfirmSubmit);

// Обновляем данные карточки и открываем попап подтверждения

function handleDeleteCard(cardElement, cardId) { 
    currentCardElement = cardElement;
    currentCardId = cardId;
    openModal(modalSubmit);
}

// Пример создания карточки с использованием функции удаления

function handleFormCardSubmit(evt) { 
    evt.preventDefault(); 
    const newPlace = placeInput.value; 
    const newLink = linkInput.value; 
    const submitButton = evt.submitter; 
 
    changeButtonState(submitButton, 'Сохранение...'); 
    submitButton.disabled = true; 

    addNewCard(newPlace, newLink) 
    .then((cardFromServer) => { 
        const userId = cardFromServer.owner._id; 
        const newCard = createCard({ 
            card: cardFromServer, 
            userId, 
            handleDeleteCard, // Передаем функцию без дублирования
            handleLike: (evt, cardId, cardElement) => { 
                const eventTarget = evt.target; 
                const likeCountElement = cardElement.querySelector('.card__like-number'); 
                if (!eventTarget.classList.contains('card__like-button_is-active')) { 
                    likeCard(cardId) 
                    .then((res) => { 
                        likeCountElement.textContent = res.likes.length; 
                        eventTarget.classList.add('card__like-button_is-active'); 
                    }); 
                } else { 
                    unlikeCard(cardId) 
                    .then((res) => { 
                        likeCountElement.textContent = res.likes.length; 
                        eventTarget.classList.remove('card__like-button_is-active'); 
                    }) 
                    .catch((error) => { 
                        console.error('Ошибка при обновлении данных:', error); 
                    }) 
                    .finally(() => { 
                        restoreButtonState(submitButton, 'Сохранить'); 
                    }); 
                } 
            }, 
            handleOpenImage: (cardImage) => { 
                openImage(cardImage); 
            } 
        }); 
        cardList.prepend(newCard); 
        closeModal(modalCard);  
        formCard.reset(); 
    }) 
    .catch((error) => { 
        console.error('Ошибка при добавлении новой карточки:', error); 
    }) 
    .finally(() => { 
        restoreButtonState(submitButton, 'Сохранить');  
    }); 
}



formCard.addEventListener('submit', handleFormCardSubmit);

// валидация форм
  
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'input-error_active'
});
