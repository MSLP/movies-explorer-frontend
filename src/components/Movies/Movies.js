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
  const [noMore, setNoMore] = useState(true);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [slicedMovies, setSlicedMovies] = useState();
  const [initialColumn, setInitialColumn] = useState(3);
  const [column, setColumn] = useState(initialColumn);

  function handleMore() {
    setColumn(column + initialColumn);
  }

  useEffect(() => {
    const stringFilter = movies.filter((movie) => {
      if (!filter.length) return false;
      setColumn(initialColumn);
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
    if (!filteredMovies?.length) setNothingFound(true);
    else {
      if (filteredMovies.length > column) {
        setSlicedMovies(filteredMovies.slice(0, column));
        setNoMore(false);
      } else {
        setSlicedMovies(filteredMovies);
        setNoMore(true);
      }
      setNothingFound(false);
    }
  }, [filteredMovies, column]);

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Enter something for searching</p>
      : (
        <MoviesCardList
          movies={slicedMovies}
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
      {noMore ? ''
        : (
          <div className="movies__more-container">
            <Button onClick={handleMore} className="movies__more-button">More</Button>
          </div>
        )}
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
