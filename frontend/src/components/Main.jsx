import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onRemoveIconClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main wrapper">
      <section className="profile">
        <div className="profile__content">
          <div
            className="profile__avatar-container"
            onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="Аватар профиля"
              className="profile__avatar"
            />
          </div>

          <div className="profile__info">
            <div className="profile__description">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards">
        <ul className="cards__items">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onRemoveIconClick={onRemoveIconClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
