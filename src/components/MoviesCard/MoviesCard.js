import Button from '../Button/Button';
import './MoviesCard.css';
import movie from '../../images/movie.png';

export default function MoviesCard() {
  return (
    <div className="movie">
      <div className="movie__header">
        <div>
          <h2 className="movie__title">33 слова о дизайне</h2>
          <p className="movie__duration">1ч 47м</p>
        </div>
        <Button className="movie__button" />
      </div>
      <img src={movie} alt="thumbnail" />
    </div>
  );
}
