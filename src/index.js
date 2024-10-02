import '../pages/index.css';
import { initialCards } from './scripts/cards.js';

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const cardList = document.querySelector('.places__list');

// Функция создания карточки
const imageModal = document.querySelector('.popup_type_image');

function createCard (card, deleteCard, like, openImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', like);

    cardImage.addEventListener('click', openImage);

    return cardElement;
}
    
// Функция открытия картинки из карточки 

function openImage() {
    imageModal.classList.add('popup_is-opened', 'popup_is-animated');
    const image = document.querySelector('.popup__image');
    const description = document.querySelector('.popup__caption');
    image.src = this.src;
    description.textContent = this.alt;
}

// Функция лайка карточки

function like(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки

function deleteCard(evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card');
    card.remove();
}

// Вывести карточки на страницу

initialCards.forEach (function(card) {
    const newCard = createCard(card, deleteCard, like, openImage);
    cardList.append(newCard);
})

// Открытие и закрытие модального окна редактировать 


const buttonEdit = document.querySelector('.profile__edit-button');
const modalEdit = document.querySelector('.popup_type_edit');
const modals = document.querySelectorAll('.popup')
const modalContent = document.querySelector('.popup__content');
const buttonsClose = document.querySelectorAll('.popup__close');

function openModal(popup) {
    return function() {
        popup.classList.add('popup_is-opened', 'popup_is-animated');
    }
}

function closeModal(popup) {
    return function() {
        popup.classList.remove('popup_is-opened');
    }
}

function closeModalEscape(popup) {
    return function(evt) {
        if (evt.key === 'Escape') {
            closeModal(popup)();
        }
    }
}

function closeModalOverlay(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('popup') && !eventTarget.classList.contains('modalContent')) {
        closeModal(eventTarget)(); 
    }
}

document.addEventListener('click', closeModalOverlay)

buttonEdit.addEventListener('click', openModal(modalEdit));

buttonsClose.forEach(button => {
    button.addEventListener('click', function() {
        const popup = this.closest('.popup');
        if (popup) {
            closeModal(popup)();
        }
    });
});

document.addEventListener('keydown', closeModalEscape(modalEdit));

modals.forEach(function(modal) {
    document.addEventListener('keydown', closeModalEscape(modal))
})

modals.forEach(function(modal) {
    modal.addEventListener('click', closeModalOverlay);
})

// текстовые поля имя профиля и о себе

const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__description');
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;

nameInput.value = name.textContent;
jobInput.value = job.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closeModal(modalEdit)();
}

formProfile.addEventListener('submit', handleFormSubmit);

// добавление своей карточки 

const modalCard = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');

buttonAdd.addEventListener('click', openModal(modalCard));
document.addEventListener('keydown', closeModalEscape(modalCard));

const formCard = document.forms['new-place'];
const placeInput = formCard.elements['place-name'];
const linkInput = formCard.elements.link;

function handleFormCardSubmit(evt) {
    evt.preventDefault();
    const newPlace = placeInput.value;
    const newLink = linkInput.value;
    const newInfo = { name: newPlace, link: newLink };
    initialCards.unshift(newInfo);
    const newCard = createCard(newInfo, deleteCard);
    cardList.prepend(newCard);
    closeModal(modalCard)();
    formCard.reset();
}

formCard.addEventListener('submit', handleFormCardSubmit);