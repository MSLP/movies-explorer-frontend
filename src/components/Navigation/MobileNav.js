import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import account from '../../images/account.svg';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  return (
    <>
      {!isOpen ? (<Button className="navigation__burger" onClick={() => setIsOpen(true)} />)
        : ('')}
      {isOpen
        ? (
          <nav className="navigation__mobile">
            <div className="navigation__container">
              <Button className="navigation__close" onClick={() => setIsOpen(false)} />
              <ul className="navigation__list">
                <li className="navigation__item"><NavLink activeClassName="navigation__link_active" className="navigation__link" exact to="/">Main</NavLink></li>
                <li className="navigation__item"><NavLink activeClassName="navigation__link_active" className="navigation__link" to="/movies">Movies</NavLink></li>
                <li className="navigation__item"><NavLink activeClassName="navigation__link_active" className="navigation__link" to="/saved-movies">Saved movies</NavLink></li>
              </ul>
              <Button onClick={() => history.push('/profile')} className="header__account-btn header__account-btn_nav">
                <img className="header__account" src={account} alt="account" />
                <p className="header__account">Account</p>
              </Button>
            </div>
          </nav>
        ) : ''}
    </>
  );
}
