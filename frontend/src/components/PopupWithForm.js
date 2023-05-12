function PopupWithForm({ name, title, size, text, children, isOpen, isLoading, onClose, onSubmit, onOverlayClose }) {
  return (
    <div className={isOpen ? `popup popup_type_${name} popup_opened` : `popup`} onClick={onOverlayClose}>
      <div className={`popup__container popup__container_${size}`}>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className="form form_edit-profile" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`form__save-button form__save-button_${size}`}>{isLoading ? `Сохранение...` : `${text}`}</button>
        </form>
      </div>
    </div >
  )
}
export default PopupWithForm;