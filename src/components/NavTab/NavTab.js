import './NavTab.css';
import Button from '../Button/Button';

export default function NavTab() {
  return (
    <div className="nav">
      <div className="nav__tabs">
        <Button className="button__nav">About</Button>
        <Button className="button__nav">Technologies</Button>
        <Button className="button__nav">Student</Button>
      </div>
    </div>
  );
}
