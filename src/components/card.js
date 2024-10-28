// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// Функция для клонирования шаблона карточки

function getCardTemplate() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

// Функция для создания карточки

function createCard({
  card,
  userId,
  handleDeleteCard,
  handleLike,
  handleOpenImage,
}) {
  const cardElement = getCardTemplate(cardTemplate);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__like-number');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

 if (card.owner && card.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      handleDeleteCard(cardElement, card._id);
    });
  } else {
    deleteButton.style.display = "none"; 
  }

  if (card.likes.some((like) => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
  }

  likeCountElement.textContent = card.likes.length;
  likeButton.addEventListener('click', (evt) => {
    handleLike(evt, card._id, cardElement)
  })

  cardImage.addEventListener('click', () => handleOpenImage(cardImage));

  return cardElement;
}

// Функция удаления карточки

function deleteCard(card) {
  card.remove();
}

export { createCard, deleteCard };
