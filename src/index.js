// Импорт файлов

import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, closeModalEscape, closeModalOverlay } from './components/modal.js';
import { createCard, like, deleteCard } from './components/card.js';

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

// Вывести карточки на страницу

initialCards.forEach (function(card) {
    const newCard = createCard(card, deleteCard, like, openImage);
    cardList.append(newCard);
})

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

// Функция открытия картинки из карточки 

function openImage() {
    openModal(imageModal);
    image.src = this.src;
    description.alt = this.alt;
    description.textContent = this.alt;
}

// Добавление плавности при открытии и закрытии 

modals.forEach(function(modal) {
    modal.classList.add('popup_is-animated');
})

// текстовые поля имя профиля и о себе

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;

// Функция открытия модального окна редактировать 

function openModalEdit() {
    openModal(modalEdit);
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closeModal(modalEdit);
}

formProfile.addEventListener('submit', submitEditProfileForm);

// добавление своей карточки 

function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const newPlace = placeInput.value;
    const newLink = linkInput.value;
    const newInfo = { name: newPlace, link: newLink };
    const newCard = createCard(newInfo, deleteCard, like,  openImage);
    cardList.prepend(newCard);
    closeModal(modalCard);
    formCard.reset();
}

formCard.addEventListener('submit', handleFormCardSubmit);