import './Header.css';
import PropTypes from 'prop-types';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import Button from '../Button/Button';
import Navigation from '../Navigation/Navigation';

export default function Header({ isMain }) {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="header__logo" />
      {isMain
        ? (
          <div>
            <Button className="header__sign">Sign Up</Button>
            <Button className="header__sign header__sign_active">Sign In</Button>
          </div>
        )
        : (
          <>
            <Navigation />
            <Button className="header__account-btn header__account-btn_tablet">
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
};

Header.defaultProps = {
  isMain: false,
};
