import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [namePlace, setNamePlace] = useState("");
  const [urlPlace, setUrlPlace] = useState("");




  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorNameClassname, setErrorNameClassname] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorLinkClassname, setErrorLinkClassname] = useState("");
  const [errorLinkMessage, setErrorLinkMessage] = useState("");

  const regexpUrl = /https?:\/\/[\w\d-]*\.*[\w\d-]{2,}.\/*[\w\d-]+.[-._~:/?#[\]@!$&'()*+,;=\w\d]*#*$/img;

  function checkFormValid() {

    if (namePlace !== '' && (namePlace.length < 2 || namePlace.length > 30)) {
      setErrorNameClassname('form__error_active');
      setErrorNameMessage('Поле Название должно содержать от 2 до 30 символов');
      setButtonDisabled(true);
    }
    else {
      setErrorNameClassname('');
      setErrorNameMessage('');
    }

    if (urlPlace !== '' && !regexpUrl.test(urlPlace)) {
      setErrorLinkClassname('form__error_active');
      setErrorLinkMessage('Адрес ссылки должен содержать корректный URL');
      setButtonDisabled(true);
    }
    else {
      setErrorLinkClassname('');
      setErrorLinkMessage('');
    }
    submitButtonDisabled();
  }

  function submitButtonDisabled() {
    if (errorNameMessage === '' && errorLinkMessage === '' && namePlace !== '' && urlPlace !== '') {
      setButtonDisabled(false);
    }
  }

  useEffect(() => {    checkFormValid();
    submitButtonDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [namePlace, urlPlace, buttonDisabled, errorNameMessage, errorLinkMessage]);









  function handleChangeName(evt) {
    setNamePlace(evt.target.value);
  }

  function handleChangeUrl(evt) {
    setUrlPlace(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: namePlace,
      link: urlPlace,
    });
  }

  return (
    <PopupWithForm
      size={"size_l"}
      title={"Новое место"}
      popupName={"js-popup-card"}
      formName={"js-form-card"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
    >
      <fieldset className="form__set">
        <label>
          <input
            placeholder="Название"
            type="text"
            className="form__input form__card-name"
            name="namePlace"
            id="js-card-name"
            value={namePlace}
            onChange={handleChangeName}
            required
            minLength="2"
            maxLength="30"
          />
          <span className={"form__error " + errorNameClassname}>{errorNameMessage}</span>
        </label>
        <label>
          <input
            placeholder="Ссылка на картинку"
            type="url"
            name="urlPlace"
            value={urlPlace}
            onChange={handleChangeUrl}
            className="form__input form__card-url"
            id="js-card-url"
            required
          />
          <span className={"form__error " + errorLinkClassname}>{errorLinkMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
