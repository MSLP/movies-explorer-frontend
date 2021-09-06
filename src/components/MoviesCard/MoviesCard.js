import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './MoviesCard.css';
import movie from '../../images/movie.png';

export default function MoviesCard({ isActive }) {
  return (
    <div className="movie">
      <div className="movie__header">
        <div>
          <h2 className="movie__title">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 47м</p>
        </div>
        <Button className={isActive ? 'movie__button movie__button_active' : 'movie__button'} />
      </div>
      <img className="movie__img" src={movie} alt="thumbnail" />
    </div>
  );
}

MoviesCard.propTypes = {
  isActive: PropTypes.bool,
};

MoviesCard.defaultProps = {
  isActive: false,
};
