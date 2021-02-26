import React, { useState, useEffect } from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

const [avatarLink, setAvatarLink] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorAvatarClassname, setErrorAvatarClassname] = useState("");
  const [errorAvatarMessage, setErrorAvatarMessage] = useState("");

  const regexpUrl = /https?:\/\/[\w\d-]*\.*[\w\d-]{2,}.\/*[\w\d-]+.[-._~:/?#[\]@!$&'()*+,;=\w\d]*#*$/img;

  function handleChangeAvatar(evt) {
    setAvatarLink(evt.target.value);
  }

  function checkFormValid() {

    if (avatarLink !== '' && !regexpUrl.test(avatarLink)) {
      setErrorAvatarClassname('form__error_active');
      setErrorAvatarMessage('Адрес ссылки должен содержать корректный URL');
      setButtonDisabled(true);
    }
    else {
      setErrorAvatarClassname('');
      setErrorAvatarMessage('');
    }
    submitButtonDisabled();
  }

  function submitButtonDisabled() {
    if (errorAvatarMessage === '' && avatarLink !== '') {
      setButtonDisabled(false);
    }
  }

  useEffect(() => {    checkFormValid();
    submitButtonDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarLink, buttonDisabled, errorAvatarMessage]);



  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink,
    });
  }

  return (
    <PopupWithForm
      size={"size_m"}
      title={"Обновить аватар"}
      popupName={"js-popup-avatar"}
      formName={"js-form-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
    >
      <fieldset className="form__set">
        <label>
          <input
            placeholder="Ссылка на аватар"
            type="url"
            name="link"
            onChange={handleChangeAvatar}
            value={avatarLink}
            className="form__input form__avatar-url"
            id="js-avatar-url"
            required
          />
          <span className={"form__error " + errorAvatarClassname}>{errorAvatarMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
