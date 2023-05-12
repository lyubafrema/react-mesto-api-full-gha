import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, isLoading, onClose, onUpdateAvatar, onOverlayClose}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
      size="size_m"
      text="Сохранить">
        <div className="popup__input-container popup__input-container_top">
          <input id="avatar-input" type="url" name="avatar" placeholder="Ссылка на картинку"
              className="popup__input popup__input_type_avatar" ref={avatarRef} required />
          <span className="avatar-input-error popup__input-error"></span>
        </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;