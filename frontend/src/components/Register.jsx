import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function Register({ handleSubmitRegistration, isLoading }) {
  const { isFormValid, errors, handleChangeValidation, inputsValid, setInputsValid, values } = useFormAndValidation();
  const { email, password } = values;

  useEffect(() => {
    //при монтировании инпуты валидны
    setInputsValid({ email: true, password: true });
  }, []);

  return (
    <div className="auth wrapper">
      <h2 className="auth__title">Регистрация</h2>
      <form
        className="auth__form"
        noValidate
        onSubmit={(e) => handleSubmitRegistration(e, email, password)}>
        <label>
          <input
            className={`auth__input ${!inputsValid.email ? 'popup__input_type_error' : ''}`}
            type="email"
            name="email"
            value={email || ''}
            placeholder="Email"
            required
            onChange={handleChangeValidation}
          />
          <span className="auth__input-error">{errors.email || ''}</span>
          <input
            className={`auth__input ${!inputsValid.password ? 'popup__input_type_error' : ''}`}
            type="password"
            name="password"
            value={password || ''}
            placeholder="Пароль"
            required
            minLength="6"
            onChange={handleChangeValidation}
          />
          <span className="auth__input-error">{errors.password || ''}</span>
        </label>
        <button
          className={`auth__button-submit ${!isFormValid ? 'auth__button-submit_disabled' : ''}`}
          type="submit"
          disabled={!isFormValid}>
          {!isLoading ? 'Зарегистрироваться' : 'Загрузка...'}
        </button>
        <Link
          to={'/sign-in'}
          className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
