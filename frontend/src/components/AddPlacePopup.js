import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup({isOpen, isLoading, onClose, onAddPlace, onOverlayClose}) {
  const {values, handleChange, setValues} = useForm({});

    useEffect(() => {
      if (isOpen) {
        setValues({});
      }
    }, [isOpen, setValues])


  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(
      values
    );
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
      size="size_l"
      text="Создать">
          <div className="popup__input-container popup__input-container_top">
            <input id="title-input" type="text" name="name" placeholder="Название"
                className="popup__input popup__input_type_title" minLength="2" maxLength="30" required value={values.name || ''} onChange={handleChange}/>
            <span className="title-input-error popup__input-error"></span>
          </div>
          <div className="popup__input-container popup__input-container_bottom">
            <input id="link-input" type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_src" required value={values.link || ''} onChange={handleChange}/>
            <span className="link-input-error popup__input-error"></span>
          </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;