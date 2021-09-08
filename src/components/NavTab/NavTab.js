import './NavTab.css';
import Button from '../Button/Button';

export default function NavTab() {
  return (
    <div className="nav">
      <div className="nav__tabs">
        <Button className="nav__button">About</Button>
        <Button className="nav__button">Technologies</Button>
        <Button className="nav__button">Student</Button>
      </div>
    </div>
  );
}
