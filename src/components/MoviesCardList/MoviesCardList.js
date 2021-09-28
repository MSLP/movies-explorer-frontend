import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ movies, setMovies, isSaved }) {
  return (
    <div className="movies">
      {movies?.map((movie) => (
        <MoviesCard
          key={movie?.id || movie?.movieId}
          movie={movie}
          isSaved={isSaved}
          setMovies={setMovies}
        />
      ))}
    </div>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  isSaved: PropTypes.bool,
  setMovies: PropTypes.func,
};

MoviesCardList.defaultProps = {
  movies: [{}],
  isSaved: false,
  setMovies: () => {},
};
