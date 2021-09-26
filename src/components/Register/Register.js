import PropTypes from 'prop-types';
import SignForm from '../SignForm/SignForm';

export default function Register({ error, onSubmit }) {
  return (
    <SignForm title="Welcome!" submit="Register" text="Already have an account?" link="Login" onSubmit={onSubmit} isRegister error={error} />
  );
}

Register.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

Register.defaultProps = {
  error: '',
};
