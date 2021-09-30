import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

export default function Movies({
  movies, setMovies, setSavedMovies, isLoading,
}) {
  const [nothingFound, setNothingFound] = useState(true);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

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
      setFilteredMovies(toggleFilter);
    } else setFilteredMovies(stringFilter);
  }, [filter, toggle, movies]);

  useEffect(() => {
    if (filteredMovies?.length) setNothingFound(false);
    else setNothingFound(true);
  }, [filteredMovies]);

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Enter something for searching</p>
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
      <Header />
      <Search handleSearch={(data) => setFilter(data)} handleToggle={() => setToggle(!toggle)} />
      {block}
      <div className="movies__more-container">
        <Button className="movies__more-button">More</Button>
      </div>
      <Footer />
    </>
  );
}

Movies.propTypes = {
  movies: PropTypes.instanceOf(Array).isRequired,
  setMovies: PropTypes.func.isRequired,
  setSavedMovies: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
