import PropTypes from 'prop-types';
import './SearchForm.css';
import useForm from '../../hooks/useForm';

export default function SearchForm({ handleSearch }) {
  const {
    values, handleChange, isValid,
  } = useForm();
  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(values.search);
  }
  return (
    <form onSubmit={handleSubmit} className="form">
      <input onChange={handleChange} className="form__input" type="text" placeholder="Film" name="search" required />
      <input className="form__input form__input_button" type="submit" value="Search" disabled={!isValid} />
    </form>
  );
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
