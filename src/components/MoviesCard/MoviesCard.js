import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './MoviesCard.css';
import movie from '../../images/movie.png';

export default function MoviesCard({ isActive, isSaved }) {
  let buttonClassName = 'movie__button';
  if (isActive || isSaved) {
    if (isActive) buttonClassName += ' movie__button_active';
    if (isSaved) buttonClassName += ' movie__button_delete';
  }

  return (
    <div className="movie">
      <div className="movie__header">
        <div>
          <h2 className="movie__title">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 47м</p>
        </div>
        <Button className={buttonClassName} />
      </div>
      <img className="movie__img" src={movie} alt="thumbnail" />
    </div>
  );
}

MoviesCard.propTypes = {
  isActive: PropTypes.bool,
  isSaved: PropTypes.bool,
};

MoviesCard.defaultProps = {
  isActive: false,
  isSaved: false,
};
