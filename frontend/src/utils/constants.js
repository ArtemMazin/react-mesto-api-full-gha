const buttonOpenModalProfile = document.querySelector('.profile__edit-button'),
  buttonOpenModalCards = document.querySelector('.profile__add-button'),
  buttonOpenModalAvatar = document.querySelector('.profile__avatar-container');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
export {
  buttonOpenModalProfile,
  buttonOpenModalCards,
  buttonOpenModalAvatar,
  validationConfig,
};
