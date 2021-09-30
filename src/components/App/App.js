import { useEffect, useState } from 'react';
import {
  Route, Switch, useHistory, Redirect, useLocation,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import mainApi from '../../utils/MainApi';
import api from '../../utils/MoviesApi';
import auth from '../../utils/Auth';
import { filterValidFields, filterSavedMovies } from '../../hooks/useFilter';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  // при монтировании компонента проверяется наличие токена,
  // если он есть, делаем запрос за информацией о пользователе,
  // затем проверяется наличие фильмов в сторадже,
  // если фильмы есть, они достаются из стораджа,
  // если нет, то начинаем загрузку с апи,
  useEffect(() => {
    console.log(loggedIn);
    const localMovies = localStorage.getItem('movies');
    const localSavedMovies = localStorage.getItem('savedMovies');
    console.log('check token', token);
    if (token) {
      setIsLoading(true);
      !Object.keys(currentUser).length && mainApi.getUserInfo()
        .then((data) => {
          console.log('user info');
          setCurrentUser(data);
          setIsLoading(false);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          localStorage.removeItem('token');
        });
      if (localSavedMovies && localMovies) {
        setSavedMovies(JSON.parse(localSavedMovies));
        setMovies(JSON.parse(localMovies));
      } else {
        setIsLoading(true);
        Promise.all([mainApi.getSavedMovies(), api.getMovies()])
          .then(([savedMoviesRes, moviesRes]) => {
            console.log('films info');
            const newSavedMovies = savedMoviesRes.map((el) => {
              const newEl = el;
              newEl.saved = true;
              return newEl;
            });

            const filterMovies = filterValidFields(moviesRes);
            const filterSavedMoviesList = filterSavedMovies(filterMovies, newSavedMovies);
            localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
            localStorage.setItem('movies', JSON.stringify(filterSavedMoviesList));
            setSavedMovies(newSavedMovies);
            setMovies(filterSavedMoviesList);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
      setIsLoading(false);
      history.push(location.pathname);
    }
  }, [token]);

  // пользователь логинится,
  // при успешном ответе в сторадж помещается токен,
  // получаем данные о фильмах с обоих апи,
  // перенаправляем пользователя на страницу movies,
  // loggedIn=true, isLoading=false
  function handleLogin(data) {
    setIsLoading(true);
    auth.login(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        Promise.all([mainApi.getSavedMovies(), api.getMovies()])
          .then(([savedMoviesRes, moviesRes]) => {
            const newSavedMovies = savedMoviesRes.map((el) => {
              const newEl = el;
              newEl.saved = true;
              return newEl;
            });

            const filterMovies = filterValidFields(moviesRes);
            const filterSavedMoviesList = filterSavedMovies(filterMovies, newSavedMovies);
            localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
            localStorage.setItem('movies', JSON.stringify(filterSavedMoviesList));
            setSavedMovies(newSavedMovies);
            setMovies(filterSavedMoviesList);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
        setLoggedIn(true);
        history.push('/movies');
        setIsLoading(false);
      })
      .catch((err) => {
        setError(`${err.message}`);
        setIsLoading(false);
      });
  }

  // при успешной регистрации автоматически вызываем логин
  function handleRegister(data) {
    setIsLoading(true);
    auth.register(data)
      .then(() => {
        handleLogin({
          email: data.email,
          password: data.password,
        });
      })
      .catch((err) => {
        setError(`${err.message}`);
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('movies');
    setMovies([]);
    setSavedMovies([]);
    setCurrentUser({});
    setToken('');
    history.push('/');
  }

  function handleUserUpdate(data) {
    setIsLoading(true);
    mainApi.changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(`${err.message}`);
        setIsLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <ProtectedRoute path="/saved-movies" loggedIn={loggedIn} component={SavedMovies} savedMovies={savedMovies} setSavedMovies={setSavedMovies} setMovies={setMovies} isLoading={isLoading} />
        <ProtectedRoute path="/movies" loggedIn={loggedIn} component={Movies} movies={movies} setMovies={setMovies} setSavedMovies={setSavedMovies} isLoading={isLoading} />
        <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile} onClick={handleSignOut} onSubmit={handleUserUpdate} isLoading={isLoading} />
        <Route path="/signup">
          {loggedIn ? <Redirect to="/movies" /> : (
            <Register error={error} onSubmit={handleRegister} isLoading={isLoading} />)}
        </Route>
        <Route path="/signin">
          {loggedIn ? <Redirect to="/movies" /> : (
            <Login error={error} onSubmit={handleLogin} isLoading={isLoading} />)}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}
