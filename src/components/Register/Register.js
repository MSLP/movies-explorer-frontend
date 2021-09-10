import SignForm from '../SignForm/SignForm';

export default function Register() {
  return (
    <SignForm title="Welcome!" submit="Register" text="Already have an account?" link="Login" isRegister />
  );
}
