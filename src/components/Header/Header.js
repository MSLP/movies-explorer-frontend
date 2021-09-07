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
            <Button className="button__header_sign">Sign Up</Button>
            <Button className="button__header_sign button__header_sign_active">Sign In</Button>
          </div>
        )
        : (
          <>
            <Navigation />
            <Button className="button__account button__account_header">
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
