import React from "react";

function PopupWithForm({
  size,
  title,
  formName,
  popupName,
  isOpen,
  onClose,
  onSubmit,
  children,
                         buttonDisabled
}) {
  const classPopupOpened = isOpen ? " popup_opened" : "";

  return (
    <section
      className={"popup popup_theme_neutral " + popupName + classPopupOpened}
    >
      <div className={"popup__container popup__" + size}>
        <form onSubmit={onSubmit} className={"form " + formName} noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button
            aria-label="Сохранить"
            type="submit"
            className="button button_save"
            disabled={buttonDisabled}
          >
            Сохранить
          </button>
        </form>
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          type="button"
          className="button button_close"
        />
      </div>
    </section>
  );
}

export default PopupWithForm;
