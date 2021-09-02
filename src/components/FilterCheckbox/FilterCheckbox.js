import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className="checkbox">
      <label htmlFor="check" className="checkbox__container">
        <input className="checkbox__input" type="checkbox" id="check" />
        <span className="checkbox__slider" />
      </label>
      <p className="checkbox__title">Short films</p>
    </div>
  );
}
