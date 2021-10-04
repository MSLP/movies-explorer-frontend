import PropTypes from 'prop-types';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchForm from '../SearchForm/SearchForm';
import './Search.css';

export default function Search({ handleSearch, handleToggle }) {
  return (
    <div className="search">
      <SearchForm handleSearch={handleSearch} />
      <FilterCheckbox handleToggle={handleToggle} />
    </div>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};
