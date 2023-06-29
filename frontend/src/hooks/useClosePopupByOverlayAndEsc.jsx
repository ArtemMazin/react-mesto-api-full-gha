import { useEffect } from 'react';

export function useClosePopupByOverlayAndEsc(isOpen, onClose) {
  //закрытие попапа по esc
  useEffect(() => {
    if (!isOpen) return;
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, onClose]);

  //закрытие попапа по оверлею
  function closePopupByOverlay(e) {
    //currentTarget - оверлей
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return { closePopupByOverlay };
}
