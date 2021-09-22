import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  return (
    <Route>
      {loggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
    </Route>
  );
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};
