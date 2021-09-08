import { useState } from 'react';
import Button from '../Button/Button';
import account from '../../images/account.svg';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
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
                <li className="navigation__item"><a className="navigation__link" href="/">Main</a></li>
                <li className="navigation__item"><a className="navigation__link" href="/movies">Movies</a></li>
                <li className="navigation__item"><a className="navigation__link" href="/saved-movies">Saved movies</a></li>
              </ul>
              <Button className="header__account-btn header__account-btn_nav">
                <img className="header__account" src={account} alt="account" />
                <p className="header__account">Account</p>
              </Button>
            </div>
          </nav>
        ) : ''}
    </>
  );
}
