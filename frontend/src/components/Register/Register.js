import React, { useState, useEffect } from "react";

import AuthForm from "../AuthForm/AuthForm";

import InfoTooltip from "../InfoTooltip/InfoTooltip";


import validator from 'validator';

function Register({
  onRegister,
  infotooltipMessage,
  infotooltipStatus,
  isInfotooltipOpened,
  onInfotooltipClose,
}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // const [message, setMessage] = useState("");
  // const [isResigterSucess, setIsRegisterSucess] = useState(false);
  //
  // const history = useHistory();


  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorEmailClassname, setErrorEmailClassname] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPassClassname, setErrorPassClassname] = useState("");
  const [errorPassMessage, setErrorPassMessage] = useState("");



  function checkFormValid() {
    if (!validator.isEmail(userData.email) && userData.email !== '') {
      setErrorEmailClassname('form__error_active');
      setErrorEmailMessage('Поле Email должно содержать корректный адрес');
      setButtonDisabled(true);
    }
    else {
      setErrorEmailClassname('');
      setErrorEmailMessage('');
    }

    if (userData.password.length < 8 && userData.password !== '') {
      setErrorPassClassname('form__error_active');
      setErrorPassMessage('Поле Пароль должно содержать не менее 8 символов');
      setButtonDisabled(true);
    }
    else {
      setErrorPassClassname('');
      setErrorPassMessage('');
    }
    submitButtonDisabled();
  }

  function submitButtonDisabled() {
    if (errorPassMessage === '' && errorEmailMessage === '' && userData.email !== '' && userData.password.length >= 8 ) {
      setButtonDisabled(false);
    }
  }

  useEffect(() => {    checkFormValid();
    submitButtonDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, buttonDisabled, errorEmailMessage, errorPassMessage]);




  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let { email, password } = userData;
    if (validator.isEmail(email)) {
      onRegister(email, password)
        .then(() => {})
        .catch(() => {});
    }
  }

  return (
    <>
      <AuthForm title="Регистрация">
        <fieldset className="form__set">
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="form__input form__input_theme_page"
              required
              onChange={handleChange}
            />
            <span className={"form__error " + errorEmailClassname}>{errorEmailMessage}</span>
          </label>
          <label>
            <input
              placeholder="Пароль"
              type="password"
              name="password"
              className="form__input form__input_theme_page"
              required
              onChange={handleChange}
            />
            <span className={"form__error " + errorPassClassname}>{errorPassMessage}</span>
          </label>
        </fieldset>
        <button
          aria-label="Зарегистрироваться"
          type="submit"
          className="button button_register"
          onClick={handleSubmit}  disabled={buttonDisabled}
        >
          Зарегистрироваться
        </button>
        <p className="form__note">
          Уже зарегистрированы? <a href="/signin">Войти</a>
        </p>
      </AuthForm>
      <InfoTooltip
        size="size_l"
        isOpened={isInfotooltipOpened}
        onClose={false}
        infotooltipStatus={infotooltipStatus}
        infotooltipMessage={infotooltipMessage}
        onInfotooltipClose={onInfotooltipClose}
      />
    </>
  );
}

export default Register;
