import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import api from '../utils/api';
import ImagePopup from './popups/ImagePopup';
import AddPlacePopup from './popups/AddPlacePopup';
import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import PopupWithSubmit from './popups/PopupWithSubmit';
import InfoTooltip from './popups/InfoTooltip';
import InfoFailLoginPopup from './popups/InfoFailLoginPopup';
import Login from './Login';
import Register from './Register';
import * as apiAuth from '../utils/apiAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isPopupWithSubmit, setIsPopupWithSubmit] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoFailLoginPopupOpen, setIsInfoFailLoginPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  //ошибки с сервера, которые подставляем в попапы при логине/регистрации
  const [errorMessageLogin, setErrorMessageLogin] = useState('');
  const [errorMessageRegister, setErrorMessageRegister] = useState('');
  //
  const navigate = useNavigate();

  //регистрация
  function showInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function handleSubmitRegistration(e, email, password) {
    e.preventDefault();
    setIsLoading(true);

    apiAuth
      .register(email, password, setErrorMessageRegister)
      .then((res) => {
        setIsRegistrationSuccess(true);
        showInfoTooltip();
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        showInfoTooltip();
        navigate('/sign-up', { replace: true });
      })
      .finally(() => setIsLoading(false));
  }

  //логин
  function showInfoFailLoginPopup() {
    setIsInfoFailLoginPopupOpen(true);
  }
  function handleLogin() {
    setLoggedIn(true);
  }
  function handleSubmitLogin(e, email, password) {
    e.preventDefault();
    setIsLoading(true);

    apiAuth
      .login(email, password, setErrorMessageLogin)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          handleLogin();
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        showInfoFailLoginPopup();
      })
      .finally(() => setIsLoading(false));
  }

  //токен
  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      apiAuth
        .getContent(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            // авторизуем пользователя
            setLoggedIn(true);
            navigate('/', { replace: true });
          }
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    Promise.all([api.getProfileData(), api.getInitialCards()])
      .then(([userInfo, arrayCards]) => {
        setCurrentUser(userInfo);
        setCards(arrayCards);
      })
      .catch(console.error);
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsPopupWithSubmit(false);
    setIsInfoTooltipOpen(false);
    setIsInfoFailLoginPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(user) {
    setIsLoading(true);
    api
      .changeProfileData(user)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .changeAvatar(user)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((newCard) => {
          return newCard._id !== card._id;
        });
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }
  function handleRemoveIconClick(card) {
    setSelectedCard(card);
    setIsPopupWithSubmit(true);
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          loggedIn={loggedIn}
          email={email}
          setLoggedIn={setLoggedIn}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                handleSubmitRegistration={handleSubmitRegistration}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleSubmitLogin={handleSubmitLogin}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onRemoveIconClick={handleRemoveIconClick}
              />
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <PopupWithSubmit
          isOpen={isPopupWithSubmit}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={selectedCard}
          isLoading={isLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegistrationSuccess={isRegistrationSuccess}
          errorMessage={errorMessageRegister}
        />
        <InfoFailLoginPopup
          isOpen={isInfoFailLoginPopupOpen}
          onClose={closeAllPopups}
          errorMessage={errorMessageLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
