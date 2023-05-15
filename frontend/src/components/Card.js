import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = (card.owner._id || card.owner) === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked && "element__like_active"}`
  );

  function handleClick() {
    console.log(card.owner);
    console.log(card.owner._id);
    console.log(currentUser._id);
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element" >
      {isOwn && <button className="element__delete" type="button" aria-label="Удалить" onClick={handleDeleteClick} />}
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like_container">
          <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}
export default Card;