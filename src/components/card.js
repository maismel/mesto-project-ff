// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// Функция для клонирования шаблона карточки

function getCardTemplate() {
    return cardTemplate.querySelector('.card').cloneNode(true);
}

// Функция для создания карточки 

function createCard (card, deleteCard, like, openImage) {
    const cardElement = getCardTemplate(cardTemplate);
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

export { createCard, like, deleteCard }