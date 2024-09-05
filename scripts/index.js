// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (card, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    
    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard (evt) {
    const eventTarget = evt.target;
    const card = eventTarget.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach (function (card) {
    const newCard = createCard(card, deleteCard);
    cardList.append(newCard);
})