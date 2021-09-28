import { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import api from '../../utils/MoviesApi';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(true);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    api.getMovies()
      .then((res) => {
        const filterRes = res.filter((movie) => {
          if (!movie.country || !movie.director || !movie.duration
            || !movie.year || !movie.description || !movie.image.formats.thumbnail.url
            || !movie.trailerLink || !movie.id || !movie.nameRU
            || !movie.nameEN) return false;
          return true;
        });
        setMovies(filterRes);
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
      setFilteredMovies(toggleFilter);
    } else setFilteredMovies(stringFilter);
  }, [filter, toggle]);

  useEffect(() => {
    if (filteredMovies?.length) setNothingFound(false);
    else setNothingFound(true);
  }, [filteredMovies]);

  return (
    <>
      <Header />
      <Search handleSearch={(data) => setFilter(data)} handleToggle={() => setToggle(!toggle)} />
      {nothingFound ? <p className="movies__not-found">No results</p> : <MoviesCardList movies={filteredMovies} />}
      <div className="movies__more-container">
        <Button className="movies__more-button">More</Button>
      </div>
      <Footer />
    </>
  );
}
