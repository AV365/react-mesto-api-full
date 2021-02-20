import React, { useRef } from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
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
    >
      <fieldset className="form__set">
        <label>
          <input
            placeholder="Ссылка на аватар"
            type="url"
            name="link"
            ref={avatarRef}
            className="form__input form__avatar-url"
            id="js-avatar-url"
            required
          />
          <span className="form__error" id="js-avatar-url-error">
            Ошибка
          </span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
