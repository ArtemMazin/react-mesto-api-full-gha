import { useEffect } from 'react';

// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''} popup_type_${name}`}
      onClick={handleOverlay}>
      {/* добавляем контейнер для контента попапа с возможностью изменения типа, чтобы ImagePopup можно было сделать с другими размерами */}
      <div className={`popup__container popup__container_type_${name}`}>
        {children}
        <button
          className="popup__close-btn"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Popup;
