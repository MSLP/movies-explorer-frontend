import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ isSaved }) {
  return (
    <div className="movies">
      <MoviesCard isSaved={isSaved} />
      <MoviesCard isSaved={isSaved} />
      <MoviesCard isActive isSaved={isSaved} />
      <MoviesCard isSaved={isSaved} />
      <MoviesCard isActive isSaved={isSaved} />
      <MoviesCard isSaved={isSaved} />
      <MoviesCard isSaved={isSaved} />
    </div>
  );
}

MoviesCardList.propTypes = {
  isSaved: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  isSaved: false,
};
