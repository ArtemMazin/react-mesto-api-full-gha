import React from 'react';
import Popup from './PopupContainer';

function InfoFailLoginPopup({ isOpen, onClose, errorMessage }) {
  return (
    <Popup
      isOpen={isOpen}
      name="info"
      onClose={onClose}>
      <div className="popup__info-icon popup__info-icon_type_fail" />
      <h2 className="popup__title popup__title_info">{errorMessage || 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
    </Popup>
  );
}

export default InfoFailLoginPopup;
