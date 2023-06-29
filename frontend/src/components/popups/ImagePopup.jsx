import React from 'react';
import Popup from './PopupContainer';

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <Popup
      isOpen={isOpen}
      name="image"
      onClose={onClose}>
      <img
        src={isOpen ? card.link : ''}
        className="popup__image"
        alt={isOpen ? card.name : ''}
      />
      <p className="popup__description">{isOpen ? card.name : ''}</p>
    </Popup>
  );
}

export default ImagePopup;
