import PropTypes from 'prop-types';
import './NavTab.css';
import Button from '../Button/Button';

export default function NavTab({ projectClick, techClick, studentClick }) {
  return (
    <div className="nav">
      <div className="nav__tabs">
        <Button onClick={projectClick} className="nav__button">About</Button>
        <Button onClick={techClick} className="nav__button">Technologies</Button>
        <Button onClick={studentClick} className="nav__button">Student</Button>
      </div>
    </div>
  );
}

NavTab.propTypes = {
  projectClick: PropTypes.func.isRequired,
  techClick: PropTypes.func.isRequired,
  studentClick: PropTypes.func.isRequired,
};
