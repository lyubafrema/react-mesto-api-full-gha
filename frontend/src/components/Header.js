import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';
import { useState } from 'react';
import burgerOpen from '../images/burger-open.svg'
import burgerClose from '../images/burger-close.svg'

function Header({ isLogged, userEmail, onSignOut }) {
  const location = useLocation();
  const [isMenuShow, setIsMenuShow] = useState(false);

  return (
    <header className="header">
      <div className='header__container'>
        <img className="header__logo" src={headerLogo} alt="Надпись: Mesto Russia, логотип проекта." />
        <button className='header__burger' onClick={() => setIsMenuShow((prev) => !prev)}>
          {isMenuShow ?
            <img src={burgerOpen} alt="Крестик" />
            :
            <img src={burgerClose} alt="Три горизонтальные полоски." />
          }
        </button>
      </div>
      <div className={isMenuShow ? `header__info-container header__info-container_show` : `header__info-container`}>
        {isLogged && <p className="header__email">{userEmail}</p>}
        {location.pathname === '/signup' && <Link to='/signin' className='header__link'>Войти</Link>}
        {location.pathname === '/signin' && <Link to='/signup' className='header__link'>Регистрация</Link>}
        {location.pathname === '/' && <Link to='/signin' className='header__link header__link_logged' onClick={onSignOut}>Выйти</Link>}
      </div>
    </header>
  )
}

export default Header;