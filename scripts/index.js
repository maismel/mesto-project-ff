// @todo: Темплейт карточки

// @todo: DOM узлы

const cardList = document.querySelector('.places__list');


// @todo: Функция создания карточки

function addCard(card) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function(evt) {
        const eventTarget = evt.target;
        const card = eventTarget.closest('.card');
        card.remove();
    })
    return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

initialCards.forEach (function(card) {
    const newCard = addCard(card);
    cardList.append(newCard);
})