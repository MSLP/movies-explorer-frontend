import PropTypes from 'prop-types';
import SignForm from '../SignForm/SignForm';

export default function Register({ onSubmit }) {
  return (
    <SignForm title="Welcome!" submit="Register" text="Already have an account?" link="Login" onSubmit={onSubmit} isRegister />
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
