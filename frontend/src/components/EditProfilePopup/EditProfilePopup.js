import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setProfileName] = useState("");
  const [description, setProfileDescription] = useState("");




  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorNameClassname, setErrorNameClassname] = useState("");
  const [errorNameMessage, setErrorNameMessage] = useState("");
  const [errorDescClassname, setErrorDescClassname] = useState("");
  const [errorDescMessage, setErrorDescMessage] = useState("");




  function submitButtonDisabled() {
    if (errorNameMessage === '' && errorDescMessage === '' && (description.length >= 2 && description.length <= 30) && (name.length >= 2 && name.length <= 30)) {

      setButtonDisabled(false);
    }
  }

  useEffect(() => {
    submitButtonDisabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, buttonDisabled, errorNameMessage, errorDescMessage]);





  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setProfileName(evt.target.value);
    if (evt.target.value.length < 2 || evt.target.value.length > 30) {
      setErrorNameClassname('form__error_active');
      setErrorNameMessage('Поле Имя должно содержать от 2 до 30 символов');
      setButtonDisabled(true);
    }
    else {
      setErrorNameClassname('');
      setErrorNameMessage('');
    }
  }

  function handleChangeDescription(evt) {
    setProfileDescription(evt.target.value);
    if (evt.target.value.length < 2 || evt.target.value.length > 30) {
      setErrorDescClassname('form__error_active');
      setErrorDescMessage('Поле О себе должно содержать от 2 до 30 символов');
      setButtonDisabled(true);
    }
    else {
      setErrorDescClassname('');
      setErrorDescMessage('');
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  useEffect(() => {
    setProfileName(currentUser.name || "");
    setProfileDescription(currentUser.about || "");
  }, [currentUser]);

  return (
    <PopupWithForm
      size={"size_l"}
      title={"Редактировать профиль"}
      popupName={"js-popup-profile"}
      formName={"js-form-profile"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonDisabled={buttonDisabled}
    >
      <fieldset className="form__set">
        <label>
          <input
            placeholder="Имя"
            type="text"
            className="form__input form__profile-name"
            name="name"
            value={name}
            id="js-profile-name"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
          <span className={"form__error " + errorNameClassname}>{errorNameMessage}</span>
        </label>
        <label>
          <input
            placeholder="О себе"
            type="text"
            className="form__input form__profile-job"
            name="description"
            value={description}
            id="js-profile-job"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
          />
          <span className={"form__error " + errorDescClassname}>{errorDescMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
