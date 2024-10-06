// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// Функция для создания карточки 

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
    const imageModal = document.querySelector('.popup_type_image');
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

export { createCard, openImage, like, deleteCard }