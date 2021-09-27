import PropTypes from 'prop-types';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchForm from '../SearchForm/SearchForm';
import './Search.css';

export default function Search({ handleSearch }) {
  return (
    <div className="search">
      <SearchForm handleSearch={handleSearch} />
      <FilterCheckbox />
    </div>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
