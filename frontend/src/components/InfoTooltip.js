function InfoTooltip ({registerErr, isOpen, onClose, onOverlayClose, size}) {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`} onClick={onOverlayClose}>
      <div className={`popup__container popup__container_${size}`}>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        {registerErr
        ? <div className="popup__icon popup__icon_fail"/>
        : <div className="popup__icon popup__icon_success"/>
        }
        <h3 className="popup__title popup__title_log-in">{registerErr ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</h3>
      </div>
    </div >
  )
}

export default InfoTooltip;