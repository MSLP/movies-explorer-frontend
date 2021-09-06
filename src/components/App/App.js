import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';

export default function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies />
      </Route>
      <Route path="/profile" />
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
