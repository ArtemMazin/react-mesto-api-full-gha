import { useEffect, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { isFormValid, errors, handleChangeValidation, inputsValid, setInputsValid, resetForm, values, setValues } =
    useFormAndValidation();

  useEffect(() => {
    //сначала очищаем форму при открытии
    resetForm();
    //при открытии попапа инпуты валидны
    setInputsValid({ name: true, job: true });
    //в данном попапе инпуты заполнены при открытии
    setValues({ name: currentUser.name, job: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonName={!isLoading ? 'Сохранить' : 'Сохранение...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isFormValid}>
      <label>
        <input
          className={`popup__input ${!inputsValid.name ? 'popup__input_type_error' : ''}`}
          type="text"
          name="name"
          placeholder="Введите имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeValidation}
          value={values.name || ''}
        />
        <span
          className="popup__input-error"
          id="name-error">
          {errors.name || ''}
        </span>
        <input
          className={`popup__input ${!inputsValid.job ? 'popup__input_type_error' : ''}`}
          type="text"
          name="job"
          placeholder="Введите профессию"
          required
          minLength="6"
          maxLength="200"
          onChange={handleChangeValidation}
          value={values.job || ''}
        />
        <span
          className="popup__input-error"
          id="job-error">
          {errors.job || ''}
        </span>
      </label>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
