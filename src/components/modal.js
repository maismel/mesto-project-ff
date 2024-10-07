function openModal(popup) {
    return function() {
        popup.classList.add('popup_is-opened', 'popup_is-animated');
        document.addEventListener('click', closeModalOverlay);
    }
}

function closeModal(popup) {
    return function() {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('click', closeModalOverlay);
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
    if (eventTarget.classList.contains('popup') && !eventTarget.classList.contains('popup__content')) {
        closeModal(eventTarget)(); 
    }
}

export { openModal, closeModal, closeModalEscape, closeModalOverlay }