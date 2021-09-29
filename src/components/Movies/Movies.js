import { useEffect, useState } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import api from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [nothingFound, setNothingFound] = useState(true);
  const [filter, setFilter] = useState('');
  const [toggle, setToggle] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function filterValidFields(array) {
    return array.filter((movie) => {
      if (!movie.country || !movie.director || !movie.duration
        || !movie.year || !movie.description || !movie.image.formats.thumbnail.url
        || !movie.trailerLink || !movie.id || !movie.nameRU
        || !movie.nameEN) return false;
      return true;
    });
  }

  function filterSavedMovies(all, saved) {
    const savedIdList = saved.map((el) => el.movieId);
    return all.map((el) => {
      const newEl = el;
      if (savedIdList.includes(newEl.id)) {
        newEl.saved = true;
        newEl._id = saved.filter((e) => newEl.id === e.movieId)[0]._id;
      }
      return newEl;
    });
  }

  useEffect(() => {
    setIsLoading(true);
    const localMovies = localStorage.getItem('savedMovies');
    if (!localMovies) {
      Promise.all([mainApi.getSavedMovies(), api.getMovies()])
        .then(([savedMovies, allMovies]) => {
          const newSavedMovies = savedMovies.map((el) => {
            const newEl = el;
            newEl.saved = true;
            return newEl;
          });
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
          const filterMovies = filterValidFields(allMovies);
          setMovies(filterSavedMovies(filterMovies, newSavedMovies));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setNothingFound(true);
        });
    } else {
      const parseLocalSavedMovies = JSON.parse(localMovies);
      api.getMovies()
        .then((res) => {
          const filterRes = filterValidFields(res);
          setMovies(filterSavedMovies(filterRes, parseLocalSavedMovies));
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNothingFound(true);
          setIsLoading(false);
        });
    }
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

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Enter something for searching</p> : <MoviesCardList movies={filteredMovies} />;
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
