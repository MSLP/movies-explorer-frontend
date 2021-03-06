import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useForm from '../../hooks/useForm';
import './SignForm.css';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

export default function SignForm({
  title, submit, text, link, onSubmit, isRegister, error,
}) {
  const {
    values, handleChange, errors, isValid,
  } = useForm();
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === '/signup') {
      onSubmit({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    }
    if (location.pathname === '/signin') {
      onSubmit({
        email: values.email,
        password: values.password,
      });
    }
  }

  return (
    <div className="sign">
      <Link className="sign__logo" to="/"><img src={logo} alt="logo" /></Link>
      <h2 className="sign__title">{title}</h2>
      <form onSubmit={handleSubmit} noValidate>
        {isRegister ? (
          <label className="sign__label" htmlFor="name">
            Name
            <input name="name" className="sign__input" type="text" minLength="2" maxLength="30" onChange={handleChange} required />
            <span className="sign__error">{errors.name || ''}</span>
          </label>
        ) : ('')}
        <label className="sign__label" htmlFor="email">
          Email
          <input name="email" className="sign__input" type="email" onChange={handleChange} required />
          <span className="sign__error">{errors.email || ''}</span>
        </label>
        <label className="sign__label" htmlFor="password">
          Password
          <input name="password" className="sign__input" type="password" onChange={handleChange} required />
          <span className="sign__error">{errors.password || ''}</span>
        </label>
        <Button className="sign__submit" type="submit" disabled={!isValid}>{submit}</Button>
        <span className="sign__error">{error}</span>
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
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isRegister: PropTypes.bool,
};

SignForm.defaultProps = {
  title: '',
  submit: '',
  text: '',
  link: '',
  error: '',
  isRegister: false,
};
