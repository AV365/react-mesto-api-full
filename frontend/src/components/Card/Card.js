import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card({ onCardLike, onCardClick, onCardDelete, card }) {



  const currentUser = useContext(CurrentUserContext);

  const likesCount = card.likes.length;

  console.log(card);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `button button_delete ${
    isOwn ? "" : "button_visibility_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `button button_like ${
    isLiked ? "button_like-isset" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card-item">
      <img
        src={card.link}
        className="card-item__pic"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card-item__footer">
        <h2 className="card-item__title">{card.name}</h2>
        <div className="card-item__like-area">
          <button
            aria-label="Нравится"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card-item__like-count">{likesCount}</p>
        </div>
      </div>
      <button
        onClick={handleCardDelete}
        aria-label="Удалить карточку"
        type="button"
        className={cardDeleteButtonClassName}
      ></button>
    </li>
  );
}

export default Card;
