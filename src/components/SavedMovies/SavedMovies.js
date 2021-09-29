import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import api from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

export default function Movies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const localSavedMovies = localStorage.getItem('savedMovies');
    if (!localSavedMovies) {
      api.getSavedMovies()
        .then((res) => {
          const newRes = res.map((el) => {
            const newEl = el;
            newEl.saved = true;
            return newEl;
          });
          setSavedMovies(newRes);
          setMovies(newRes);
          localStorage.setItem('savedMovies', JSON.stringify(newRes));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setNothingFound(true);
        });
    } else {
      const parseLocalMovies = JSON.parse(localSavedMovies);
      setSavedMovies(parseLocalMovies);
      setMovies(parseLocalMovies);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const stringFilter = savedMovies.filter((movie) => {
      if (!filter.length) return true;
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
  }, [filter, toggle, savedMovies]);

  useEffect(() => {
    if (movies?.length) setNothingFound(false);
    else setNothingFound(true);
  }, [movies]);

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Nothing saved</p> : <MoviesCardList movies={movies} setSavedMovies={setMovies} />;
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
