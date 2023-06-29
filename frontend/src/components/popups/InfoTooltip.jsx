import React from 'react';
import Popup from './PopupContainer';

function InfoTooltip({ isOpen, onClose, isRegistrationSuccess, errorMessage }) {
  return (
    <Popup
      isOpen={isOpen}
      name="info"
      onClose={onClose}>
      <div
        className={`popup__info-icon ${
          isRegistrationSuccess ? 'popup__info-icon_type_success' : 'popup__info-icon_type_fail'
        }`}
      />
      <h2 className="popup__title popup__title_info">
        {isRegistrationSuccess
          ? 'Вы успешно зарегистрировались!'
          : errorMessage || 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h2>
    </Popup>
  );
}
export default InfoTooltip;
