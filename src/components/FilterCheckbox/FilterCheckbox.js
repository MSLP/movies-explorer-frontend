import PropTypes from 'prop-types';
import './FilterCheckbox.css';

export default function FilterCheckbox({ handleToggle }) {
  return (
    <div className="checkbox">
      <label htmlFor="check" className="checkbox__container">
        <input onClick={handleToggle} className="checkbox__input" type="checkbox" id="check" />
        <span className="checkbox__slider" />
      </label>
      <p className="checkbox__title">Short films</p>
    </div>
  );
}

FilterCheckbox.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};
