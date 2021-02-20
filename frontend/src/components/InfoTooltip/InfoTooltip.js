import React, { useState } from "react";

function InfoTooltip({
  size,
  isOpened,
  onClose,
  infotooltipStatus,
  infotooltipMessage,
  onInfotooltipClose,
}) {
  const classPopupOpened = isOpened ? " popup_opened" : "";
  const classResisterStatus = infotooltipStatus ? "sucess" : "error";

  return (
    <section className={"popup popup_theme_neutral " + classPopupOpened}>
      <div className={"popup__container popup__" + size}>
        <div className={"infotooltip infotooltip_type_" + classResisterStatus}>
          <h3 className={"infotooltip__message"}>{infotooltipMessage}</h3>
        </div>

        <button
          onClick={onInfotooltipClose}
          aria-label="Закрыть окно"
          type="button"
          className="button button_close"
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
