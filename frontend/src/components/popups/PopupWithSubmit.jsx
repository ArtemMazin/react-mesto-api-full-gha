import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function PopupWithSubmit({ isOpen, onClose, onSubmit, card, isLoading }) {
  const { isFormValid, setIsFormValid } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  //в этом попапе кнопка должна быть активной при открытии попапа
  useEffect(() => {
    setIsFormValid(true);
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      buttonName={!isLoading ? 'Да' : 'Удаление...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}
    />
  );
}
export default PopupWithSubmit;
