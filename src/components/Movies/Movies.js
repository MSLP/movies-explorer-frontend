import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function Movies() {
  return (
    <>
      <Header isMovies />
      <Search />
      <MoviesCard />
    </>
  );
}
