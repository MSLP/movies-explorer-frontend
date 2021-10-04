import PropTypes from 'prop-types';
import SignForm from '../SignForm/SignForm';
import Preloader from '../Preloader/Preloader';

export default function Register({ error, onSubmit, isLoading }) {
  return (
    isLoading ? <Preloader /> : <SignForm title="Welcome!" submit="Register" text="Already have an account?" link="Login" onSubmit={onSubmit} isRegister error={error} />
  );
}

Register.propTypes = {
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Register.defaultProps = {
  error: '',
  isLoading: false,
};
