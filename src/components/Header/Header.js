import { useHistory, Link } from 'react-router-dom';
import './Header.css';
import PropTypes from 'prop-types';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import Button from '../Button/Button';
import Navigation from '../Navigation/Navigation';

export default function Header({ isMain, loggedIn }) {
  const history = useHistory();

  return (
    <div className="header">
      <Link className="header__logo" to="/"><img src={logo} alt="logo" /></Link>
      {isMain && !loggedIn
        ? (
          <div>
            <Button onClick={() => history.push('/signup')} className="header__sign">Sign Up</Button>
            <Button onClick={() => history.push('/signin')} className="header__sign">Sign In</Button>
          </div>
        )
        : (
          <>
            <Navigation />
            <Button onClick={() => history.push('/profile')} className="header__account-btn header__account-btn_tablet">
              <img className="header__account" src={account} alt="account" />
              <p className="header__account">Account</p>
            </Button>
          </>
        )}
    </div>
  );
}

Header.propTypes = {
  isMain: PropTypes.bool,
  loggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isMain: false,
  loggedIn: false,
};
