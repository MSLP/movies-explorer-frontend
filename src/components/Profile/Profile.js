import './Profile.css';
import useForm from '../../hooks/useForm';
import Button from '../Button/Button';
import Header from '../Header/Header';

export default function Profile() {
  const { values, handleChange, errors } = useForm();
  return (
    <>
      <Header />
      <div className="profile">
        <h2 className="profile__title">Hello, Mariia!</h2>
        <form className="profile__form">
          <label className="profile__label" htmlFor="name">
            Name
            <input name="name" className="profile__input" type="text" value={values.name} minLength="2" maxLength="30" onChange={handleChange} placeholder="Name" required />
          </label>
          <span className="profile__error">{errors.name || ''}</span>
          <label className="profile__label" htmlFor="email">
            Email
            <input name="email" className="profile__input" type="email" value={values.email} placeholder="Email" onChange={handleChange} required />
          </label>
          <span className="profile__error">{errors.email || ''}</span>
          <Button className="profile__edit" type="submit">Edit</Button>
        </form>
        <Button className="profile__logout">Logout</Button>
      </div>
    </>
  );
}
