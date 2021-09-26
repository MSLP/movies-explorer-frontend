import PropTypes from 'prop-types';
import SignForm from '../SignForm/SignForm';

export default function Login({ error, onSubmit }) {
  return (
    <SignForm title="Welcome back!" submit="Login" text="Don't have an account?" link="Register" onSubmit={onSubmit} error={error} />
  );
}

Login.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Login.defaultProps = {
  error: '',
};
