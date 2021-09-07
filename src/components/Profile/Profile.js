import './Profile.css';
import Button from '../Button/Button';
import Header from '../Header/Header';

export default function Profile() {
  return (
    <>
      <Header />
      <div className="profile">
        <h2 className="profile__title">Hello, Mariia!</h2>
        <form className="profile__form">
          <label className="profile__label" htmlFor="name">
            Name
            <input id="name" className="profile__input" type="text" value="Mariia" placeholder="Name" required />
          </label>
          <label className="profile__label" htmlFor="email">
            Email
            <input id="email" className="profile__input" type="email" value="email@yandex.ru" placeholder="Email" required />
          </label>
          <Button className="profile__edit" type="submit">Edit</Button>
        </form>
        <Button className="profile__logout">Logout</Button>
      </div>
    </>
  );
}
