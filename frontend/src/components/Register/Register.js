import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AuthForm from "../AuthForm/AuthForm";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
//import InfoTooltip from "../InfoTooltip/InfoTooltip";

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

  const [message, setMessage] = useState("");
  const [isResigterSucess, setIsRegisterSucess] = useState(false);

  const history = useHistory();

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
        .then((res) => {})
        .catch((err) => {});
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
            <span className="form__error">Ошибка</span>
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
            <span className="form__error">Ошибка</span>
          </label>
        </fieldset>
        <button
          aria-label="Зарегистрироваться"
          type="submit"
          className="button button_register"
          onClick={handleSubmit}
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
