import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    loggedIn && mainApi.getUserInfo()
      .then((userData) => setCurrentUser(userData))
      .catch((err) => console.log(err));
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Main loggedIn={loggedIn} />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <ProtectedRoute path="/movies" loggedIn component={Movies} />
        <ProtectedRoute path="/saved-movies" loggedIn component={SavedMovies} />
        <ProtectedRoute path="/profile" loggedIn component={Profile} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}
