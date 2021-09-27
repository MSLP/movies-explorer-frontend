import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.getSavedMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setMovies(movies.filter((movie) => {
      if (!filter.length) return true;
      const searchableMovieName = movie.nameEN?.toLowerCase();
      return searchableMovieName?.includes(filter.trim().toLowerCase()) || false;
    }));
  }, [filter]);

  return (
    <>
      <Header isMovies />
      <Search handleSearch={(data) => setFilter(data)} />
      {movies.length ? <MoviesCardList movies={movies} isSaved /> : <p className="movies__not-found">No results</p>}
      <Footer />
    </>
  );
}
