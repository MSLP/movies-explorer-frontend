import PropTypes from 'prop-types';
import SignForm from '../SignForm/SignForm';
import Preloader from '../Preloader/Preloader';

export default function Login({ error, onSubmit, isLoading }) {
  return (
    isLoading ? <Preloader /> : <SignForm title="Welcome back!" submit="Login" text="Don't have an account?" link="Register" onSubmit={onSubmit} error={error} />
  );
}

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Login.defaultProps = {
  error: '',
  isLoading: false,
};
