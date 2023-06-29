import React from 'react';

function HideMenu({ isMenuOpen, email, signOut }) {
  return (
    <div className={`header__hide-menu ${isMenuOpen ? 'header__hide-menu_active' : ''}`}>
      <p className="header__email">{email || ''}</p>
      <button
        type="button"
        className="header__button"
        onClick={signOut}>
        Выйти
      </button>
    </div>
  );
}

export default HideMenu;
