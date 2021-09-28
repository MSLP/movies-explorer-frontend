import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(true);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getSavedMovies()
      .then((res) => {
        setMovies(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Nothing saved</p> : <MoviesCardList movies={movies} setMovies={setMovies} isSaved />;
  }

  return (
    <>
      <Header isMovies />
      <Search handleSearch={(data) => setFilter(data)} handleToggle={() => setToggle(!toggle)} />
      {block}
      <Footer />
    </>
  );
}
