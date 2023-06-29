import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onRemoveIconClick }) {
  const handleClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onRemoveIconClick(card);
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `cards__remove-icon ${isOwn ? 'cards__remove-icon_visible' : ''}`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `cards__like ${isLiked ? 'cards__like_active' : ''}`;

  return (
    <li className="cards__item">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={handleClick}
      />
      <div className="cards__description">
        <h2 className="cards__text">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="cards__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
