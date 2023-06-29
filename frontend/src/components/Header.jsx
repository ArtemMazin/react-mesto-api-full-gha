import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';
import HideMenu from './HideMenu';

function Header({ loggedIn, setLoggedIn, email }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    //при входе/выходе меню должно быть изначально скрыто
    setIsMenuOpen(false);
  }, [loggedIn]);

  function toggleHideMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  return (
    <header className="header">
      <HideMenu
        isMenuOpen={isMenuOpen}
        email={email}
        signOut={signOut}
      />
      <div className="header__content">
        <img
          src={logo}
          alt="Логотип проекта: Место"
          className="header__logo"
        />
        {/* если пользователь залогинен, то увидит email и кнопку выход, а на мобильных устройствах бургер-меню. если не
        залогинен, то увидит ссылки на вход/регистрацию */}
        {loggedIn ? (
          <>
            {!isMenuOpen ? (
              <button
                className="header__menu-hamburger"
                onClick={toggleHideMenu}>
                <span className="header__menu-bar" />
              </button>
            ) : (
              <button
                className="header__close-menu-btn"
                onClick={toggleHideMenu}
              />
            )}
            <div className="header__profile header__profile_mobile">
              <p className="header__email">{email}</p>
              <button
                type="button"
                className="header__button"
                onClick={signOut}>
                Выйти
              </button>
            </div>
          </>
        ) : (
          <Link
            //location.pathname показывает текущее местоположение
            to={location.pathname === '/sign-up' ? '/sign-in' : '/sign-up'}
            className="header__link">
            {location.pathname === '/sign-up' ? 'Войти' : 'Регистрация'}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
