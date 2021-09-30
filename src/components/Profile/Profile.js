import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import Header from '../Header/Header';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function Profile({ onClick, onSubmit, isLoading }) {
  const { values, handleChange, errors } = useForm();
  const user = useContext(CurrentUserContext);

  useEffect(() => {
    console.log('userInfo ', user);
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: values.name,
      email: values.email,
    });
  }

  return (
    <>
      <Header />
      {isLoading ? <Preloader />
        : (
          <div className="profile">
            <h2 className="profile__title">{`Hello, ${user.name}!`}</h2>
            <form onSubmit={handleSubmit} className="profile__form">
              <label className="profile__label" htmlFor="name">
                Name
                <input name="name" className="profile__input" type="text" value={values.name || ''} minLength="2" maxLength="30" onChange={handleChange} placeholder={user.name} required />
              </label>
              <span className="profile__error">{errors.name || ''}</span>
              <label className="profile__label" htmlFor="email">
                Email
                <input name="email" className="profile__input" type="email" value={values.email || ''} placeholder={user.email} onChange={handleChange} required />
              </label>
              <span className="profile__error">{errors.email || ''}</span>
              <Button className="profile__edit" type="submit">Edit</Button>
            </form>
            <Button onClick={onClick} className="profile__logout">Logout</Button>
          </div>
        )}
    </>
  );
}

Profile.propTypes = {
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

Profile.defaultProps = {
  isLoading: false,
};
