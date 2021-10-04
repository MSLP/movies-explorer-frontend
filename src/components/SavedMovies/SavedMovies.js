import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

export default function SavedMovies({
  savedMovies, setMovies, setSavedMovies, isLoading,
}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

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
      setFilteredMovies(toggleFilter);
    } else setFilteredMovies(stringFilter);
  }, [filter, toggle, savedMovies]);

  useEffect(() => {
    if (filteredMovies?.length) setNothingFound(false);
    else setNothingFound(true);
  }, [filteredMovies]);

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Nothing saved</p>
      : (
        <MoviesCardList
          movies={filteredMovies}
          setMovies={setMovies}
          setSavedMovies={setSavedMovies}
        />
      );
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

SavedMovies.propTypes = {
  savedMovies: PropTypes.instanceOf(Array).isRequired,
  setMovies: PropTypes.func.isRequired,
  setSavedMovies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
