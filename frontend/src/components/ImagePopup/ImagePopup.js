function ImagePopup({ popupName, onClose, isOpen, card }) {
  const classPopupOpened = isOpen ? " popup_opened" : "";
  return (
    <>
      <section
        className={"popup popup_theme_dark " + popupName + classPopupOpened}
      >
        <ul className="preview">
          <li>
            <img src={card.link} alt={card.name} className="preview__image" />
            <p className="preview__title">{card.name}</p>
            <button
              onClick={onClose}
              aria-label="Закрыть окно"
              type="button"
              className="button button_close"
            />
          </li>
        </ul>
      </section>
    </>
  );
}

export default ImagePopup;
