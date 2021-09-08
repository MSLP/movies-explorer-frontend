import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './SignForm.css';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

export default function SignForm({
  title, submit, text, link, isRegister,
}) {
  return (
    <div className="sign">
      <Link className="sign__logo" to="/"><img src={logo} alt="logo" /></Link>
      <h2 className="sign__title">{title}</h2>
      <form>
        <label className="sign__label" htmlFor="name">
          Name
          <input id="name" className="sign__input" type="text" required />
        </label>
        <label className="sign__label" htmlFor="email">
          Email
          <input id="email" className="sign__input" type="email" required />
        </label>
        <label className={isRegister ? 'sign__label' : 'sign__label sign__none'} htmlFor="password">
          Password
          <input id="password" className="sign__input" type="password" required />
        </label>
        <Button className="sign__submit" type="submit">{submit}</Button>
      </form>
      <p className="sign__text">
        {text}
        {isRegister ? <Link className="sign__link" to="/signin">{link}</Link>
          : <Link className="sign__link" to="/signup">{link}</Link>}
      </p>
    </div>
  );
}

SignForm.propTypes = {
  title: PropTypes.string,
  submit: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  isRegister: PropTypes.bool,
};

SignForm.defaultProps = {
  title: '',
  submit: '',
  text: '',
  link: '',
  isRegister: false,
};
