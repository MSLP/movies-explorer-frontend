import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <div className="movies">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard isActive />
      <MoviesCard />
      <MoviesCard isActive />
      <MoviesCard />
      <MoviesCard />
    </div>
  );
}
