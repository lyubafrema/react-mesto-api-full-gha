import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, onOverlayClose, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
      size="size_l"
      text="Сохранить">
          <div className="popup__input-container popup__input-container_top">
            <input id="name-input" type="text" name="name" placeholder="Имя" className="popup__input popup__input_type_name"
                minLength="2" maxLength="40" required value={name || ""} onChange={handleChangeName}/>
              <span className="name-input-error popup__input-error"></span>
            </div>
            <div className="popup__input-container popup__input-container_bottom">
              <input id="caption-input" type="text" name="about" placeholder="О себе"
                className="popup__input popup__input_type_caption" minLength="2" maxLength="200" required value={description || ""} onChange={handleChangeDescription}/>
              <span className="caption-input-error popup__input-error"></span>
          </div>
    </PopupWithForm>
  )
}

export default EditProfilePopup;