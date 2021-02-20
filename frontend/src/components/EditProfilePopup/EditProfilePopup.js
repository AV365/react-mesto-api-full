import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setProfileName] = useState("");
  const [description, setProfileDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(evt) {
    setProfileName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setProfileDescription(evt.target.value);
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
          <span className="form__error" id="js-profile-name-error">
            Ошибка
          </span>
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
          <span className="form__error" id="js-profile-job-error">
            Ошибка
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
