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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '154f5bdf-df05-4616-a7df-dbae8412531e',
    'Content-Type': 'application/json'
  }
};
