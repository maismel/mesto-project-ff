function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeModalOverlay);
    document.addEventListener('keydown', (evt) => closeModalEscape(evt, popup));
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeModalOverlay);
    document.removeEventListener('keydown', closeModalEscape);
}

function closeModalEscape(evt, popup) {
    if (evt.key === 'Escape') {
        closeModal(popup);
    }
}

function closeModalOverlay(evt) {
    const eventTarget = evt.target;
    if (eventTarget.classList.contains('popup') && !eventTarget.classList.contains('popup__content')) {
        closeModal(eventTarget); 
    }
}

export { openModal, closeModal, closeModalEscape, closeModalOverlay }