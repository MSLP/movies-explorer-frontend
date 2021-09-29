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
    }).map((movie) => ({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`,
      trailer: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${movie?.image?.formats?.thumbnail?.url}`,
      owner: null,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      saved: false,
      _id: null,
    }));
  }

  function filterSavedMovies(all, saved) {
    return all.map((el) => {
      const newEl = el;
      const candidateList = saved.filter((e) => newEl.movieId === e.movieId);
      if (candidateList.length) {
        newEl.saved = true;
        newEl._id = candidateList[0]._id;
        newEl.owner = candidateList[0].owner;
      } else {
        newEl.saved = false;
        newEl._id = undefined;
        newEl.owner = undefined;
      }
      return newEl;
    });
  }

  useEffect(() => {
    console.log('useEffect');
    setIsLoading(true);
    const localMovies = localStorage.getItem('movies');
    const localSavedMovies = localStorage.getItem('savedMovies');
    if (!localMovies || !localSavedMovies) {
      Promise.all([mainApi.getSavedMovies(), api.getMovies()])
        .then(([savedMovies, allMovies]) => {
          const newSavedMovies = savedMovies.map((el) => {
            const newEl = el;
            newEl.saved = true;
            return newEl;
          });
          localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
          const filterMovies = filterValidFields(allMovies);
          const filterSavedMoviesList = filterSavedMovies(filterMovies, newSavedMovies);
          setMovies(filterSavedMoviesList);
          localStorage.setItem('movies', JSON.stringify(filterSavedMoviesList));
          setIsLoading(false);
          console.log('movies', filterSavedMoviesList);
          console.log('savedMovies', newSavedMovies);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setNothingFound(true);
        });
    } else {
      const parseLocalMovies = JSON.parse(localMovies);
      const parseLocalSavedMovies = JSON.parse(localSavedMovies);
      const filterLocalMovies = filterSavedMovies(parseLocalMovies, parseLocalSavedMovies);
      setMovies(filterLocalMovies);
      localStorage.setItem('movies', JSON.stringify(filterLocalMovies));
      setIsLoading(false);
      console.log('movies', filterLocalMovies);
      console.log('savedMovies', parseLocalSavedMovies);
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
    console.log('filteredMovies', filteredMovies);
  }, [filter, toggle, movies]);

  useEffect(() => {
    if (filteredMovies?.length) setNothingFound(false);
    else setNothingFound(true);
  }, [filteredMovies]);

  let block = <Preloader />;
  if (!isLoading) {
    block = nothingFound ? <p className="movies__not-found">Enter something for searching</p> : <MoviesCardList movies={filteredMovies} setMovies={setMovies} />;
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
