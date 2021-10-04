import PropTypes from 'prop-types';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies, setSavedMovies, setMovies,
}) {
  return (
    <div className="movies">
      {movies?.map((movie) => (
        <MoviesCard
          key={movie?.id || movie?.movieId}
          movie={movie}
          isSaved={movie?.saved}
          setSavedMovies={setSavedMovies}
          setMovies={setMovies}
        />
      ))}
    </div>
  );
}

MoviesCardList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  setMovies: PropTypes.func,
  setSavedMovies: PropTypes.func,
};

MoviesCardList.defaultProps = {
  movies: [{}],
  setMovies: () => {},
  setSavedMovies: () => {},
};
