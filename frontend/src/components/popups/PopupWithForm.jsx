import React from 'react';
import Popup from './PopupContainer';

function PopupWithForm({ isOpen, name, title, onSubmit, children, isValid, buttonName, onClose }) {
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form
        className="popup__form"
        name={`form_${name}`}
        id={`form-${name}`}
        noValidate
        onSubmit={onSubmit}>
        {children}
        <button
          className={`popup__button-submit ${!isValid ? 'popup__button-submit_disabled' : ''}`}
          type="submit"
          disabled={!isValid}>
          {buttonName}
        </button>
      </form>
    </Popup>
  );
}
export default PopupWithForm;
