import './Register.css';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

export default function Register() {
  return (
    <div className="register">
      <img src={logo} alt="logo" className="register__logo" />
      <h2 className="register__title">Welcome!</h2>
      <form>
        <label className="register__label" htmlFor="name">
          Name
          <input id="name" className="register__input" type="text" required />
        </label>
        <label className="register__label" htmlFor="email">
          Email
          <input id="email" className="register__input" type="email" required />
        </label>
        <label className="register__label" htmlFor="password">
          Password
          <input id="password" className="register__input" type="password" required />
        </label>
        <Button className="register__submit" type="submit">Register</Button>
      </form>
      <p className="register__text">
        Already have an account?
        <a className="register__link" href="/signin">Login</a>
      </p>
    </div>
  );
}
