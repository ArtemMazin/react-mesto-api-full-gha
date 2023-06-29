import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit, isLoading }) {
  const { isFormValid, errors, handleChangeValidation, inputsValid, setInputsValid, resetForm, values } =
    useFormAndValidation();

  useEffect(() => {
    //при открытии попапа инпуты валидны
    setInputsValid({ name: true, link: true });
    resetForm();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit(values);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="cards"
      buttonName={!isLoading ? 'Создать' : 'Создание...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}>
      <label>
        <input
          className={`popup__input ${!inputsValid.name ? 'popup__input_type_error' : ''}`}
          type="text"
          name="name"
          placeholder="Введите название"
          value={values.name || ''}
          required
          minLength="2"
          maxLength="30"
          onChange={handleChangeValidation}
        />
        <span className="popup__input-error">{errors.name || ''}</span>
        <input
          className={`popup__input ${!inputsValid.link ? 'popup__input_type_error' : ''}`}
          type="url"
          name="link"
          placeholder="Введите ссылку"
          value={values.link || ''}
          required
          onChange={handleChangeValidation}
        />
        <span className="popup__input-error">{errors.link || ''}</span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
