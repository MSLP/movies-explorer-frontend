import './Header.css';
import logo from '../../images/logo.svg';
import Button from '../Button/Button';

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="header__logo" />
      <div>
        <Button className="button__header_sign">Sign Up</Button>
        <Button className="button__header_sign button__header_sign_active">Sign In</Button>
      </div>
    </div>
  );
}
