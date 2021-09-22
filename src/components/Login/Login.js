import PropTypes from 'prop-types';
import SignForm from '../SignForm/SignForm';

export default function Login({ onSubmit }) {
  return (
    <SignForm title="Welcome back!" submit="Login" text="Don't have an account?" link="Register" onSubmit={onSubmit} />
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
