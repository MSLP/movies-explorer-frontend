import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import mainApi from '../../utils/MainApi';
import auth from '../../utils/Auth';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    console.log(loggedIn);
    const token = localStorage.getItem('token');
    token && auth.checkToken(token)
      .then((data) => {
        setLoggedIn(true);
        console.log(data);
        history.push('/movies');
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    loggedIn && mainApi.getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.log(err));
  }, [loggedIn]);

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        history.push('/movies');
      })
      .catch((err) => setError(`${err.message}`));
  }

  function handleLogin(data) {
    auth.login(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('token', res.token);
        history.push('/movies');
      })
      .catch((err) => setError(`${err.message}`));
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/signup">
          <Register error={error} onSubmit={handleRegister} />
        </Route>
        <Route path="/signin">
          <Login error={error} onSubmit={handleLogin} />
        </Route>
        <ProtectedRoute path="/movies" loggedIn component={Movies} />
        <ProtectedRoute path="/saved-movies" loggedIn component={SavedMovies} />
        <ProtectedRoute path="/profile" loggedIn component={Profile} onClick={handleSignOut} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}
