import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './MoviesCard.css';
import api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function MoviesCard({
  movie, isSaved, setMovies, setSavedMovies,
}) {
  const user = useContext(CurrentUserContext);
  const location = useLocation();
  let buttonClassName = 'movie__button';
  if (location.pathname === '/movies' && isSaved) {
    buttonClassName += ' movie__button_active';
  }
  if (location.pathname === '/saved-movies' && isSaved) {
    buttonClassName += ' movie__button_delete';
  }

  function toggleSave(e) {
    if (e.target.className.includes('delete') || e.target.className.includes('active')) {
      console.log('toggleDelete', movie);
      api.deleteMovie(movie._id)
        .then(() => {
          setSavedMovies((state) => state.filter((c) => c._id !== movie._id));
          const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          const newLocalSavedMovies = localSavedMovies.filter((el) => el.movieId !== movie.movieId);
          localStorage.setItem('savedMovies', JSON.stringify(newLocalSavedMovies));
          const localMovies = JSON.parse(localStorage.getItem('movies'));
          const newLocalMovies = localMovies
            .map((el) => {
              if (el.movieId === movie.movieId) {
                const newEl = el;
                newEl.saved = false;
                newEl.owner = null;
                newEl._id = null;
                return newEl;
              } return el;
            });
          localStorage.setItem('movies', JSON.stringify(newLocalMovies));
          setMovies(localMovies);
        })
        .catch((err) => console.log(err));
    } else {
      console.log('toggleSave', movie);
      api.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.image,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        owner: user.id,
      })
        .then((res) => {
          res.saved = true;
          const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          localSavedMovies.push(res);
          localStorage.setItem('savedMovies', JSON.stringify(localSavedMovies));
          setSavedMovies(localSavedMovies);
          const localMovies = JSON.parse(localStorage.getItem('movies'));
          const newLocalMovies = localMovies
            .map((el) => {
              if (el.movieId === res.movieId) {
                const newEl = el;
                newEl.saved = true;
                newEl.owner = res.owner;
                newEl._id = res._id;
                return newEl;
              } return el;
            });
          localStorage.setItem('movies', JSON.stringify(newLocalMovies));
          setMovies(newLocalMovies);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="movie">
      <div className="movie__header">
        <div>
          <h2 className="movie__title">{movie?.nameEN}</h2>
          <p className="movie__duration">
            {movie?.duration}
            &nbsp;min
          </p>
        </div>
        <Button onClick={toggleSave} className={buttonClassName} />
      </div>
      <a href={movie?.trailer} target="_blank" rel="noreferrer">
        <img className="movie__img" src={movie?.image} alt="thumbnail" />
      </a>
    </div>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    country: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string,
    nameEN: PropTypes.string,
    nameRU: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.number,
    movieId: PropTypes.number,
    _id: PropTypes.string,
    trailer: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  isSaved: PropTypes.bool,
  setMovies: PropTypes.func,
  setSavedMovies: PropTypes.func,
};

MoviesCard.defaultProps = {
  isSaved: false,
  setSavedMovies: () => {},
  setMovies: () => {},
};
