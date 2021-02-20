import React, { useContext } from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main>
        <section className="profile">
          <div
            className="profile__avatar-container js-edit-avatar"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt={currentUser.name}
            />
          </div>
          <div className="profile__person-info">
            <h1 className="profile__person" id="profileName">
              {currentUser.name}
            </h1>

            <button
              aria-label="Редактировать"
              type="button"
              className="button button_edit"
              id="editButton"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job" id="profileJob">
              {currentUser.about}
            </p>
          </div>

          <button
            aria-label="Добавить"
            className="button button_add"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>
        <section>
          <ul className="cards">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  onCardClick={onCardClick}
                  card={card}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
