import Header from '../Header/Header';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies() {
  return (
    <>
      <Header isMovies />
      <Search />
      <MoviesCardList />
    </>
  );
}