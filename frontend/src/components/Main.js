import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
      />
  ));

  return (
    <main className="content">
      <div className="spinner"></div>
      <div className="container">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__overlay" onClick={onEditAvatar}>
              <img className="profile__avatar" alt="Фото профиля." src={currentUser.avatar} />
            </div>
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__caption">{currentUser.about}</p>
            </div>
            <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          {cardsElements}
        </section>
      </div>
    </main>
  )
}

export default Main;