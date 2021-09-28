import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(true);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    api.getSavedMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        console.log(err);
        setNothingFound(true);
      });
  }, []);

  useEffect(() => {
    const stringFilter = movies.filter((movie) => {
      if (!filter.length) return false;
      const searchableMovieName = movie.nameEN?.toLowerCase();
      return searchableMovieName?.includes(filter.trim().toLowerCase()) || false;
    });
    if (toggle) {
      const toggleFilter = stringFilter.filter((movie) => {
        const searchableMovieTime = movie.duration;
        return searchableMovieTime <= 40;
      });
      setMovies(toggleFilter);
    } else setMovies(stringFilter);
  }, [filter, toggle]);

  useEffect(() => {
    if (movies?.length) setNothingFound(false);
    else setNothingFound(true);
  }, [movies]);

  return (
    <>
      <Header isMovies />
      <Search handleSearch={(data) => setFilter(data)} handleToggle={() => setToggle(!toggle)} />
      {nothingFound ? <p className="movies__not-found">No results</p> : <MoviesCardList movies={movies} setMovies={setMovies} isSaved />}
      <Footer />
    </>
  );
}
