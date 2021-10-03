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
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const location = useLocation();

  // check token
  // if token -> get user info ->
  // check movies in storage -> get movies from storage or APIs
  // else redirect for login
  useEffect(() => {
    const localMovies = localStorage.getItem('movies');
    const localSavedMovies = localStorage.getItem('savedMovies');
    if (token) {
      auth.checkToken(token)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);

          if (localSavedMovies && localMovies) {
            setSavedMovies(JSON.parse(localSavedMovies));
            setMovies(JSON.parse(localMovies));
          } else {
            setIsLoading(true);
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
                setIsLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          localStorage.removeItem('token');
          localStorage.removeItem('savedMovies');
          localStorage.removeItem('movies');
          history.push('/signin');
        });
      history.push(location.pathname);
    }
    history.push(location.pathname);
  }, [token]);

  // auth
  // success -> localStorage(token)
  // get movies info from both APIs
  // redirect to movies
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
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
        setLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setError(`${err.message}`);
        setIsLoading(false);
      });
  }

  // register success -> handleLogin()
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

  // clean storage and states when logout
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
