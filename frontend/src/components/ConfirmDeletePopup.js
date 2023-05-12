function ConfirmDeletePopup ({isOpen, onClose, name, title, size, text, isLoading, onDeleteCard, onOverlayClose, card}) {
  function handleSubmit() {
    onDeleteCard(card);
  }

  return (
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup`} onClick={onOverlayClose}>
      <div className={`popup__container popup__container_${size}`}>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <button type="submit" className="popup__check-button" onClick={handleSubmit}>{isLoading ? `Подождите...` : `${text}`}</button>
      </div>
    </div >
  )
}

export default ConfirmDeletePopup;