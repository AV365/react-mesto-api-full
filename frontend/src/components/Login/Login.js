import React, { useContext, useState, useHistory } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AuthForm from "../AuthForm/AuthForm";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import validator from 'validator';

function Login({
  onLogin,
  infotooltipMessage,
  infotooltipStatus,
  isInfotooltipOpened,
  onInfotooltipClose,
}) {
  //const history = useHistory();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

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
      onLogin(email, password)
        .then((res) => {})
        .catch((err) => {});
    }

  }

  return (
    <>
      <AuthForm title="Вход">
        <fieldset className="form__set">
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="form__input form__input_theme_page"
              onChange={handleChange}
              required
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
          aria-label="Войти"
          type="submit"
          className="button button_login"
          onClick={handleSubmit}
        >
          Войти
        </button>
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

export default Login;
