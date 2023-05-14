import '../index.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Api from '../utils/api'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigImagePopupOpen, setIsBigImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [IsInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [registerErr, setRegisterErr] = useState(false);
  const navigate = useNavigate();

  // конфиг для api
  const api = new Api({
    url: 'https://api.lyubafrema.nomoredomains.monster',
    // url: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });

  // проверяем авторизован ли пользователь, если да - перенаправляем на главную страницу
  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, [isLogged, navigate])

  // проверяем есть ли токен в локал сторейдж, если да - авторизуем
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setUserEmail(res.email);
          }
        })
        .catch((err) => console.log(err))
    }
  }, [])

  //  загрузка карточек и инфы о пользователе
  useEffect(() => {
    isLogged &&
      Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cards, data]) => {
          setCards(cards.reverse());
          setCurrentUser(data);
          setUserEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged])

  // функция авторизации
  const onLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((res) => {
        if (!res) {
          console.log('Неправильный логин или пароль.');
        }
        if (res.token) {
          setIsLogged(true);
          localStorage.setItem('token', res.token);
        }
      })
      .then(() => navigate('/', { replace: true }))
      .catch((err) => console.log(err));
  }

  // функция регистрации
  const onRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then((res) => {
        if (!res) {
          console.log('Что-то пошло не так.');
        }
        if (res) {
          return res;
        }
      })
      .then(() => {
        navigate('/', { replace: true });
        setRegisterErr(false);
        setIsInfoTooltipOpen((prev) => !prev);
      })
      .catch((err) => {
        console.log(err)
        setRegisterErr(true);
        setIsInfoTooltipOpen((prev) => !prev);
      });
  }

  // функция выхода
  const onSignOut = () => {
    setIsLogged(false);
    setUserEmail('');
    localStorage.removeItem('token');
    navigate('/signin', { replace: true })
  }

  const handleEditProfile = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlace = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatar = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setIsBigImagePopupOpen(true);
    setSelectedCard(card);
  }

  const handleDeleteClick = (card) => {
    setIsConfirmDeletePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setSubmitIsLoading(true);
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => card._id !== c._id))
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setSubmitIsLoading(true);
    api.editProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setSubmitIsLoading(true);
    api.changeAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setSubmitIsLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSubmitIsLoading(false);
      });
  }

  const closeAllPopups = (e) => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsBigImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isBigImagePopupOpen || isConfirmDeletePopupOpen || IsInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])


  function handleOnOverlayClose(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            userEmail={userEmail}
            isLogged={isLogged}
            onSignOut={onSignOut} />
          <Routes>
            <Route path="/" element={<ProtectedRouteElement
              element={Main}
              isLogged={isLogged}
              onEditProfile={handleEditProfile}
              onAddPlace={handleAddPlace}
              onEditAvatar={handleEditAvatar}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
            />} />
            <Route
              path="/signup"
              element={<Register
                onRegister={onRegister}
              />} />
            <Route
              path="/signin"
              element={<Login
                onLogin={onLogin}
              />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
          <InfoTooltip
            registerErr={registerErr}
            isOpen={IsInfoTooltipOpen}
            onClose={closeAllPopups}
            onOverlayClose={handleOnOverlayClose}
            size="size_l"
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onOverlayClose={handleOnOverlayClose}
            isLoading={submitIsLoading} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onOverlayClose={handleOnOverlayClose}
            isLoading={submitIsLoading} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onOverlayClose={handleOnOverlayClose}
            isLoading={submitIsLoading} />
          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            isLoading={submitIsLoading}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            onOverlayClose={handleOnOverlayClose}
            name="delete-card"
            title="Вы уверены?"
            size="size_s"
            text="Да"
            card={selectedCard}
          />
          <ImagePopup
            card={selectedCard}
            name="big-image"
            isOpen={isBigImagePopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={handleOnOverlayClose} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;