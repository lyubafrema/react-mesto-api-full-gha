// конфиг валидации
export const configValidation = ({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  spanErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active',
});

// конфиг для api
export const configApi = {
  baseUrl: 'http://api.lyubafrema.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json'
  }
};
