import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import SearchForm from '../SearchForm/SearchForm';
import './Search.css';

export default function Search() {
  return (
    <div className="search">
      <SearchForm />
      <FilterCheckbox />
    </div>
  );
}
