import './SearchForm.css';

export default function SearchForm() {
  return (
    <form className="form">
      <input className="form__input" type="text" placeholder="Film" />
      <input className="form__input form__input_button" type="submit" value="Search" />
    </form>
  );
}
