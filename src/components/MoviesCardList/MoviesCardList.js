import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, isSaved }) {
  return (
    <div className="movies">
      {movies?.map((movie) => <MoviesCard key={movie?.id} movie={movie} isSaved={isSaved} />)}
    </div>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  isSaved: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  movies: [{}],
  isSaved: false,
};
