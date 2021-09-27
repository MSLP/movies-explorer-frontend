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
  const [filter, setFilter] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    api.getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredMovies(movies.filter((movie) => {
      if (!filter.length) return false;
      const searchableMovieName = movie.nameEN?.toLowerCase();
      return searchableMovieName?.includes(filter.trim().toLowerCase()) || false;
    }));
  }, [filter]);

  return (
    <>
      <Header />
      <Search handleSearch={(data) => setFilter(data)} />
      {filteredMovies.length ? <MoviesCardList movies={filteredMovies} /> : <p className="movies__not-found">No results</p>}
      <div className="movies__more-container">
        <Button className="movies__more-button">More</Button>
      </div>
      <Footer />
    </>
  );
}
