import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './MoviesCard.css';
import api from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function MoviesCard({ movie, isSaved, setMovies }) {
  const user = useContext(CurrentUserContext);
  const location = useLocation();
  const img = movie?.image?.formats?.thumbnail?.url ? `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}` : movie?.image;
  let buttonClassName = 'movie__button';
  if (location.pathname === '/movies' && isSaved) {
    buttonClassName += ' movie__button_active';
  }
  if (location.pathname === '/saved-movies' && isSaved) {
    buttonClassName += ' movie__button_delete';
  }

  function toggleSave(e) {
    e.preventDefault();
    if (e.target.className.includes('delete') || e.target.className.includes('active')) {
      api.deleteMovie(movie._id)
        .then(() => {
          setMovies((state) => state.filter((c) => c._id !== movie._id));
          const local = JSON.parse(localStorage.getItem('savedMovies'));
          console.log('old local', local);
          console.log('movie', movie);
          const newLocal = local.filter((el) => el.movieId !== movie.movieId);
          console.log('newLocal local', newLocal);
          localStorage.setItem('savedMovies', JSON.stringify(newLocal));
          e.target.className = 'movie__button';
        })
        .catch((err) => console.log(err));
    } else if (!movie.saved) {
      api.saveMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`,
        trailer: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`,
        owner: user.id,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
        .then((res) => {
          const local = JSON.parse(localStorage.getItem('savedMovies'));
          res.saved = true;
          local.push(res);
          localStorage.setItem('savedMovies', JSON.stringify(local));
          if (location.pathname === '/movies') {
            e.target.className = 'movie__button movie__button_active';
          }
          if (location.pathname === '/saved-movies') {
            e.target.className = 'movie__button movie__button_delete';
          }
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
      <a href={movie?.trailerLink || movie?.trailer} target="_blank" rel="noreferrer">
        <img className="movie__img" src={img} alt="thumbnail" />
      </a>
    </div>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    saved: PropTypes.bool,
    country: PropTypes.string,
    director: PropTypes.string,
    description: PropTypes.string,
    nameEN: PropTypes.string,
    nameRU: PropTypes.string,
    year: PropTypes.string,
    duration: PropTypes.number,
    movieId: PropTypes.number,
    id: PropTypes.number,
    _id: PropTypes.string,
    trailerLink: PropTypes.string,
    trailer: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any), PropTypes.string]),
  }).isRequired,
  isSaved: PropTypes.bool,
  setMovies: PropTypes.func,
};

MoviesCard.defaultProps = {
  isSaved: false,
  setMovies: () => {},
};
