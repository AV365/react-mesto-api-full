import React, { useRef, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
  const [namePlace, setNamePlace] = useState("");
  const [urlPlace, setUrlPlace] = useState("");

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
          <span className="form__error" id="js-card-name-error">
            Ошибка
          </span>
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
          <span className="form__error" id="js-card-url-error">
            Ошибка
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
