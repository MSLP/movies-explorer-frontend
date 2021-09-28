import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './MoviesCard.css';

export default function MoviesCard({ movie, isActive, isSaved }) {
  let buttonClassName = 'movie__button';
  if (isActive || isSaved) {
    if (isActive) buttonClassName += ' movie__button_active';
    if (isSaved) buttonClassName += ' movie__button_delete';
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
        <Button className={buttonClassName} />
      </div>
      <a href={movie?.trailerLink} target="_blank" rel="noreferrer">
        <img className="movie__img" src={`https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`} alt="thumbnail" />
      </a>
    </div>
  );
}

MoviesCard.propTypes = {
  movie: PropTypes.shape({
    nameEN: PropTypes.string,
    duration: PropTypes.number,
    trailerLink: PropTypes.string,
    image: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};

MoviesCard.defaultProps = {
  isActive: false,
  isSaved: false,
};
