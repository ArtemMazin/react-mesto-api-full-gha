import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const { isFormValid, errors, handleChangeValidation, inputsValid, setInputsValid, resetForm } =
    useFormAndValidation();
  const input = useRef();

  useEffect(() => {
    resetForm();
    //очищаем инпут при открытии попапа
    input.current.value = '';
    //при открытии попапа инпут валиден
    setInputsValid({ avatar: true });
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: input.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonName={!isLoading ? 'Сохранить' : 'Сохранение...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}>
      <label>
        <input
          className={`popup__input ${!inputsValid.avatar ? 'popup__input_type_error' : ''}`}
          name="avatar"
          type="url"
          placeholder="Введите ссылку на изображение"
          required
          ref={input}
          onChange={handleChangeValidation}
        />
        <span
          className="popup__input-error"
          id="avatar-error">
          {errors.avatar || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
